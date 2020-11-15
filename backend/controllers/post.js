const {Post, Comments, userLiked, commentLiked} = require('./../models/post')
const User = require('./../models/users')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')
const noctification = require('./../models/noctification')
const follow = require('./../models/follow')
const {groupMembers, groups} = require('./../models/group')
const sequelizePagination = require('sequelize-paginate')
const fs = require('fs')


var logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })



exports.createOne = (req, res, next) => {
    const body = JSON.parse(req.body.body)
    if(!body.content || body.content.length === 0){
        return res.status(400).json({message : "il faut un contenu au post !"})
    }
    if (req.files && req.files.length === 1) {
        Post.create({
            content: body.content, like: 0, dislike: 0, userId: req.session.userId,
            imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`
        })
            .then(() => res.status(201).json({message: 'post créé !'}))
            .then(() => next())
            .catch(error => {
                logger.write(error)
                res.status(500).json({message : "Erreur lors de la création du post"})}
                )
    } else {
        Post.create({content: body.content, like: 0, dislike: 0, userId: req.session.userId})
            .then(() => res.status(201).json({message: 'post créé !'}))
            .then(() => next())
            .catch(error => {
                logger.write(error)
                res.status(500).json({message : "Erreur lors de la création du post"})})
    }

}
exports.postGroup = (req, res, next) => {//next for notification creation    //create a post linked followed a group
    const body = JSON.parse(req.body.body)
    if (req.files && req.files.length > 0) {
        Post.create({
            content: body.content, like: 0, dislike: 0, userId: req.session.userId,
            imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`, groupId: req.params.id
        })
            .then(() => res.status(201).json({message: 'post créé !'}))
            .then(() => next())
            .catch(error => {
                logger.write(error)
                res.status(500).json({message : "Erreur lors de la création du post"})
            })
    } else {
        Post.create({content: body.content, like: 0, dislike: 0, userId: req.session.userId, groupId : req.params.id})
            .then(() => res.status(201).json({message: 'post créé !'}))
            .then(() => next())
                .catch(error => {
                    logger.write(error)
                    res.status(500).json({message : "Erreur lors de la création du post"})
                })
    }

}

exports.getOne = (req, res, next) => {
    Post.findOne({where: {postId: req.params.id}})
        .then(post => res.status(200).json({post}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({message : "Impossible de récupérer le post."})})
}

exports.getAll = (req, res, next) => {
    const current_page = req.query.page ? req.query.page : 1

    Post.paginate({
        page: req.query.page,
        paginate : 10,
        order: [['createdAt', 'DESC']],
         include: [{
            model: User,
            attributes: ['lastName', 'firstName', 'profilImgUrl']
        }, {
            model: userLiked,
            where: {
                userId: {
                    [Op.eq]: req.session.userId
                }
            },
            attributes: ['type'],
            required: false
        },{
            model : groups,
             attributes: ['groupName'],
             required:false
         }
        ]
    })
    .then(posts => {
        const prev = current_page === 1 ? process.env.BASE_URL + '/api/post?page=1' : process.env.BASE_URL + '/api/post?page=' + (current_page-1)
        const next = current_page.toString() === posts.pages.toString() ? process.env.BASE_URL + '/api/post?page='+ posts.pages : process.env.BASE_URL + '/api/post?page=' + (current_page+1)
        const links = {
            prev,
            next,
            first: process.env.BASE_URL +'/api/post?page=1',
            last : process.env.BASE_URL + '/api/post?page=' + posts.pages
        }
        res.status(200).json({...posts, posts : posts.docs, current_page, links})
    })
    .catch(error => {
        logger.write(error)
        res.status(500).json({message : "Erreur lors de la création des post."})
    })
}

exports.getAllfromGroups = (req, res, next) => {
    const current_page = req.query.page ? req.query.page : 1
    const next_page = current_page + 1
    Post.paginate({
        page: req.query.page,
        paginate : 10,
        order:[['createdAt', "DESC"]],
        where: {groupId: {[Op.eq]: req.params.id}},
         include: [{
            model: User,
            attributes: ['lastName', 'firstName', 'profilImgUrl'],
            required:false
        }, {
            model: userLiked,
            where: {
                userId: {
                    [Op.eq]: req.session.userId
                }
            },
            attributes: ['type'],
            required: false
        }
        ]
    })
    .then(posts => {
        const prev = current_page === 1 ? process.env.BASE_URL + '/api/group/'+ req.params.id +'/post?page=1' : process.env.BASE_URL + '/api/group/' + req.params.id +'/post?page=' + (current_page-1)
        const next = posts.pages.toString() === current_page.toString() ? process.env.BASE_URL + '/api/group/'+ req.params.id +'/post?page=' + posts.pages : process.env.BASE_URL + '/api/group/' + req.params.id +'/post?page=' + next_page
        const links = {
            prev,
            next,
            first: process.env.BASE_URL +'/api/group/'+ req.params.id + '/post?page=1',
            last : process.env.BASE_URL + '/api/group/'+ req.params.id + '/post?page=' + posts.pages
        }
        res.status(200).json({...posts, posts : posts.docs, current_page, links})
    })
    .catch(error => {
        logger.write(error)
        res.status(500).json({message : "Erreur lors de la récupération des posts."})
    })
}

exports.modifyOne = (req, res, next) => {

    const postId = req.params.id
    const id = req.session.email
    const content = req.body.content

    if(req.files && req.files.length === 1){
        Post.findOne({where: {postId}})
            .then(result => {
                const old = result.imgUrl.split('/uploads/')[1]
                fs.unlink('/uploads/' + old)
            })
            .then(()=>{
                Post.update({content, imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`}, {
                    where: {postId}
                })
                    .then(() => {
                        Post.findOne({
                            where: {postId: req.params.id}, include: [{
                                model: User,
                                attributes: ['lastName', 'firstName', 'profilImgUrl']
                            }, {
                                model: userLiked,
                                where: {
                                    userId: {
                                        [Op.eq]: req.session.userId
                                    }
                                },
                                attributes: ['type'],
                                required: false
                            }
                            ]
                        })
                            .then(post => res.status(200).json({post}))
                            .catch(error => res.status(500).json({error}))
                    })
                    .catch(error =>{
                        logger.write(error)
                        res.status(500).json({message : "Erreur lors de la mis à jour du posts."})
                    })
            })

    }
    else {

        Post.update({content}, {
            where: {postId}
        })
            .then(() => {
                Post.findOne({
                    where: {postId: req.params.id}, include: [{
                        model: User,
                        attributes: ['lastName', 'firstName', 'profilImgUrl']
                    }, {
                        model: userLiked,
                        where: {
                            userId: {
                                [Op.eq]: req.session.userId
                            }
                        },
                        attributes: ['type'],
                        required: false
                    }
                    ]
                })
                    .then(post => res.status(200).json({post}))
                    .catch(error => res.status(500).json({error}))
            })
            .catch(error =>{
                logger.write(error)
                res.status(500).json({message : "Erreur lors de la mis à jour du posts."})
            })
    }


}

exports.deleteOne = (req, res) => {
    const postId = req.params.id
    Post.destroy({where: {postId: postId}, include: [Comments, userLiked]})
        .then(() => res.status(200).json({message: 'post supprimé !'}))
        .catch((error) => {
            logger.write(error)
            res.status(500).json({message : "Erreur lors de la suppréssion du post."})
        })
}

// COMMENT

exports.getComment = (req, res) => {
    const postId = req.params.id
    Comments.findAll({
        where: {postId: postId},
        include: [{model: User, attributes: ['lastName', 'firstName', 'profilImgUrl']},
            {model: commentLiked, attributes: ['type'], where: {userId: req.session.userId}, required: false}]
    })
        .then(comment => res.status(200).json({comment}))
        .catch(error =>{
            logger.write(error)
            res.status(500).json({message : "Erreur lors de la récupération des commentaires."})
        })
}

exports.createComment = (req, res) => {
    const postId = req.params.id
    if(!req.body.content || req.body.content.length === 0){
        return res.status(400).json({message : "Le commentaire doit avoir un contenu"})
    }
    Comments.create({
        content: req.body.content,
        postId: req.params.id,
        userId: req.body.userId
    })
        .then(comment => res.status(201).json({comment}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({message : "Erreur lors de la création du commentaire."})
        })
}

exports.modifyComment = (req, res) => {
    const content = req.body.content
    if(!req.body.content || req.body.content.length === 0){
        return res.status(400).json({message : "Le commentaire doit avoir un contenu"})
    }
    Comments.update({content}, {
        where: {commentId: req.params.id}
    })
        .then(comment => {
            Comments.findOne({
                where: {commentId: req.params.id}, include: [{
                    model: User
                }, {
                    model: commentLiked,
                    attributes: ['type']
                }]
            })
                .then(comment => {
                    res.status(200).json({comment})
                })
                .catch(error => {
                    logger.write(error)
                    res.status(500).json({message : "Erreur lors de la modification du commentaire."})
                })
        })
        .catch(error => {
            logger.write(error)
            res.status(500).json({message : "Erreur lors de la modification du commentaire."})
        })
}

exports.deleteComment = (req, res) => {
    const id = req.params.id
    Comments.destroy({where: {commentId: id}})
        .then(() => res.status(200).json({message: 'commentaire supprimé !'}))
        .catch(error => {
            logger.write(error)
            res.status(500).json({message : "Erreur lors de la suppréssion du commentaire."})
        })
}


exports.like = (req, res) => {
    const id = req.params.id
    const userId = req.session.userId
    const like = req.body.like
    let bool;
    if (like === 1) {
        bool = true
    } else if (like === -1) {
        bool = false
    }
    userLiked.findAll({where: {[Op.and]: [{userId}, {postId: id}]}})
        .then(liked => {
            if (liked.length >= 1) {
                if (like === 0) {
                    userLiked.findOne({where: {[Op.and]: [{postId: id}, {userId: userId}]}, attributes: ['type']})
                        .then(like => {
                            switch (like.dataValues.type) {
                                case true:
                                    Post.findAll({where: {postId: id}})
                                        .then(option => option[0].decrement('like')
                                            .then(() => {
                                                userLiked.destroy({where: {[Op.and]: [{postId: id}, {userId: userId}]}})
                                                    .then(() => {
                                                        Post.findOne({
                                                            where: {postId: id}, include: [{
                                                                model: User,
                                                                attributes: ['lastName', 'firstName', 'profilImgUrl']
                                                            }, {
                                                                model: userLiked,
                                                                where: {
                                                                    userId: {
                                                                        [Op.eq]: req.session.userId
                                                                    }
                                                                },
                                                                attributes: ['type'],
                                                                required: false
                                                            }
                                                            ]
                                                        })
                                                            .then(post => {
                                                                res.status(200).json({post})
                                                            })
                                                            .catch(error => {
                                                                logger.write(error)
                                                                res.status(500).json({message : "Erreur interne."})
                                                            })
                                                    })
                                                    .catch(error =>{
                                                        logger.write(error)
                                                        res.status(409).json({message : "Ce like ne vous appartient pas !"})
                                                    })
                                            }))
                                        .catch(error => {
                                            logger.write(error)
                                            res.status(500).json({message : "Erreur interne."})
                                        })
                                    break;
                                case false:
                                    Post.findAll({where: {postId: id}})
                                        .then(option => option[0].decrement('dislike')
                                            .then(() => {
                                                userLiked.destroy({where: {[Op.and]: [{postId: id}, {userId: userId}]}})
                                                    .then(() => {
                                                        Post.findOne({
                                                            where: {postId: id}, include: [{
                                                                model: User,
                                                                attributes: ['lastName', 'firstName', 'profilImgUrl']
                                                            }, {
                                                                model: userLiked,
                                                                where: {
                                                                    userId: {
                                                                        [Op.eq]: req.session.userId
                                                                    }
                                                                },
                                                                attributes: ['type'],
                                                                required: false
                                                            }
                                                            ]
                                                        })
                                                            .then(post => res.status(200).json({post}))
                                                            .catch(error =>{
                                                                logger.write(error)
                                                                res.status(500).json({message : "Erreur interne."})
                                                            })
                                                    })
                                                    .catch(error => {
                                                        logger.write(error)
                                                        res.status(409).json({message : "Ce like ne vous appartient pas !"})
                                                    })
                                            }))
                                        .catch(error => {
                                            logger.write(error)
                                            res.status(500).json({message : "Erreur interne !"})
                                        })
                                    break;
                            }
                        })
                        .catch(error => {
                            logger.write(error)
                            res.status(500).json({message : "Erreur interne !"})
                        })

                } else if (like !== 0) {
                    res.status(409).json({message: 'like déjà existant'})
                }

            } else if (liked.length === 0) {
                switch (like) {
                    case 1:
                        userLiked.create({postId: id, userId: userId, type: true})
                            .then(() => {
                                Post.findAll({
                                    where: {postId: id}, include: [{
                                        model: User,
                                        attributes: ['lastName', 'firstName', 'profilImgUrl']
                                    }, {
                                        model: userLiked,
                                        where: {
                                            userId: {
                                                [Op.eq]: req.session.userId
                                            }
                                        },
                                        attributes: ['type'],
                                        required: false
                                    }
                                    ]
                                })
                                    .then(option => {
                                        console.log(option)
                                        option[0].increment('like')
                                            .then(() => Post.findOne({
                                                where: {postId: id}, include: [{
                                                    model: User,
                                                    attributes: ['lastName', 'firstName', 'profilImgUrl']
                                                }, {
                                                    model: userLiked,
                                                    where: {
                                                        userId: {
                                                            [Op.eq]: req.session.userId
                                                        }
                                                    },
                                                    attributes: ['type'],
                                                    required: false
                                                }
                                                ]
                                            })
                                                .then(post => res.status(200).json({post}))
                                                .catch(error => {
                                                    logger.write(error)
                                                    res.status(409).json({message : "Ce like ne vous appartient pas !"})
                                                }))
                                            .catch(error => {
                                                logger.write(error)
                                                res.status(500).json({message : "erreur interne"})
                                            })

                                    })
                                    .catch(error => {
                                        logger.write(error)
                                        res.status(404).json({message : "Erreur"})
                                    })
                            })
                            .catch(error => {
                                logger.write(error)
                                res.status(409).json({message : "Vous avez déjà liké"})
                            })
                        break;

                    case -1:
                        userLiked.create({postId: id, userId: userId, type: false})
                            .then(() => Post.findAll({
                                where: {postId: id}, include: [{
                                    model: User,
                                    attributes: ['lastName', 'firstName', 'profilImgUrl']
                                }, {
                                    model: userLiked,
                                    where: {
                                        userId: {
                                            [Op.eq]: req.session.userId
                                        }
                                    },
                                    attributes: ['type'],
                                    required: false
                                }
                                ]
                            })
                                .then(option => {
                                    option[0].increment('dislike')
                                        .then(() => Post.findOne({
                                            where: {postId: id}, include: [{
                                                model: User,
                                                attributes: ['lastName', 'firstName', 'profilImgUrl']
                                            }, {
                                                model: userLiked,
                                                where: {
                                                    userId: {
                                                        [Op.eq]: req.session.userId
                                                    }
                                                },
                                                attributes: ['type'],
                                                required: false
                                            }
                                            ]
                                        })
                                            .then(post => res.status(200).json({post}))
                                            .catch(error => res.status(404).json({error})))
                                        .catch(error => console.log(error))
                                })
                                .catch(error => {
                                    logger.write(error)
                                    res.status(500).json({message : "Erreur interne"})
                                }))
                            .catch(error => {
                                logger.write(error)
                                res.status(409).json({message : "Vous avez déjà liké"})
                            })
                        break;
                    case 0:
                        res.status(404).json({message: 'like inexistant'})
                        break;

                    default:
                        return res.status(400).json({message: "mauvais format"})
                        break;
                }
            }
        })

}

exports.commentLike = (req, res) => {
    const id = req.params.id
    const userId = req.session.userId
    const like = req.body.like
    let bool;
    if (like === 1) {
        bool = true
    } else if (like === -1) {
        bool = false
    }
    commentLiked.findAll({where: {[Op.and]: [{userId}, {commentId: id}]}})
        .then(liked => {
            if (liked.length >= 1) {
                if (like === 0) {
                    commentLiked.findOne({where: {[Op.and]: [{commentId: id}, {userId: userId}]}, attributes: ['type']})
                        .then(like => {
                            switch (like.dataValues.type) {
                                case true:
                                    Comments.findAll({where: {[Op.and]: [{commentId: id}]}})
                                        .then(option => option[0].decrement('like')
                                            .then(() => {
                                                commentLiked.destroy({where: {[Op.and]: [{commentId: id}, {userId: userId}]},})
                                                    .then(() => {
                                                        Comments.findOne({
                                                            where: {commentId: id}, include: [{
                                                                model: User,
                                                                attributes: ['lastName', 'firstName', 'profilImgUrl']
                                                            }, {
                                                                model: commentLiked,
                                                                where: {
                                                                    userId: {
                                                                        [Op.eq]: req.session.userId
                                                                    }
                                                                },
                                                                attributes: ['type'],
                                                                required: false
                                                            }]
                                                        })
                                                            .then(comment => {
                                                                res.status(200).json({comment})
                                                            })
                                                            .catch(error => res.status(404).json({error}))
                                                    })
                                                    .catch(error => res.status(409).json({error}))
                                            }))
                                        .catch(error => console.log(error))
                                    break;
                                case false:
                                    Comments.findAll({where: {[Op.and]: [{commentId: id}]}})
                                        .then(option => option[0].decrement('dislike')
                                            .then(() => {
                                                commentLiked.destroy({where: {[Op.and]: [{commentId: id}, {userId: userId}]}})
                                                    .then(() => {
                                                        Comments.findOne({
                                                            where: {commentId: id}, include: [{
                                                                model: User,
                                                                attributes: ['lastName', 'firstName', 'profilImgUrl']
                                                            }, {
                                                                model: commentLiked,
                                                                where: {
                                                                    userId: {
                                                                        [Op.eq]: req.session.userId
                                                                    }
                                                                },
                                                                attributes: ['type'],
                                                                required: false
                                                            }
                                                            ]
                                                        })
                                                            .then(comment => res.status(200).json({comment}))
                                                            .catch(error => {
                                                                logger.write(error)
                                                                res.status(500).json({message : "Ce like ne vous appartient pas !"})
                                                            })
                                                    })
                                                    .catch(error => {
                                                        logger.write(error)
                                                        res.status(500).json({message : "like inexistant"})
                                                    })
                                            }))
                                        .catch(error => {
                                            logger.write(error)
                                            res.status(500).json({message : "Erreur interne"})
                                        })
                                    break;
                            }
                        })
                        .catch(error => {
                            logger.write(error)
                            res.status(500).json({message : "Erreur interne"})
                        })

                } else if (like !== 0) {
                    res.status(409).json({message: 'like déjà existant'})
                }

            } else if (liked.length === 0) {
                switch (like) {
                    case 1:
                        commentLiked.create({commentId: id, userId: userId, type: true})
                            .then(() => {
                                Comments.findAll({
                                    where: {commentId: id}, include: [{
                                        model: User,
                                        attributes: ['lastName', 'firstName', 'profilImgUrl']
                                    }, {
                                        model: commentLiked,
                                        where: {
                                            userId: {
                                                [Op.eq]: req.session.userId
                                            }
                                        },
                                        attributes: ['type'],
                                        required: false
                                    }
                                    ]
                                })
                                    .then(option => {
                                        console.log(option)
                                        option[0].increment('like')
                                            .then(() => Comments.findOne({
                                                where: {commentId: id}, include: [{
                                                    model: User,
                                                    attributes: ['lastName', 'firstName', 'profilImgUrl']
                                                }, {
                                                    model: commentLiked,
                                                    where: {
                                                        userId: {
                                                            [Op.eq]: req.session.userId
                                                        }
                                                    },
                                                    attributes: ['type'],
                                                    required: false
                                                }
                                                ]
                                            })
                                                .then(comment => res.status(200).json({comment}))
                                                .catch(error => {
                                                    logger.write(error)
                                                    res.status(404).json({message : "Erreur interne"})
                                                }))
                                            .catch(error => {
                                                logger.write(error)
                                                res.status(500).json({message : "Erreur interne"})
                                            })

                                    })
                                    .catch(error => {
                                        logger.write(error)
                                        res.status(404).json({message : "Erreur interne"})
                                    })
                            })
                            .catch(error => {
                                logger.write(error)
                                res.status(500).json({message : "Vous avez déjà liké"})
                            })
                        break;

                    case -1:
                        commentLiked.create({commentId: id, userId: userId, type: false})
                            .then(() => Comments.findAll({
                                where: {commentId: id}, include: [{
                                    model: User,
                                    attributes: ['lastName', 'firstName', 'profilImgUrl']
                                }, {
                                    model: commentLiked,
                                    where: {
                                        userId: {
                                            [Op.eq]: req.session.userId
                                        }
                                    },
                                    attributes: ['type'],
                                    required: false
                                }
                                ]
                            })
                                .then(option => {
                                    option[0].increment('dislike')
                                        .then(() => Comments.findOne({
                                            where: {commentId: id}, include: [{
                                                model: User,
                                                attributes: ['lastName', 'firstName', 'profilImgUrl']
                                            }, {
                                                model: commentLiked,
                                                where: {
                                                    userId: {
                                                        [Op.eq]: req.session.userId
                                                    }
                                                },
                                                attributes: ['type'],
                                                required: false
                                            }
                                            ]
                                        })
                                            .then(comment => res.status(200).json({comment}))
                                            .catch(error => {
                                                logger.write(error)
                                                res.status(404).json({message : "Erreur interne"})
                                            }))
                                        .catch(error => {
                                            logger.write(error)
                                            res.status(500).json({message : "Erreur interne"})
                                        })
                                })
                                .catch(error => {
                                    logger.write(error)
                                    res.status(404).json({message : "Erreur interne"})
                                }))
                            .catch(error => {
                                logger.write(error)
                                res.status(409).json({message : "Vous avez déjà liké"})
                            })
                        break;
                    case 0:
                        res.status(404).json({message: 'like inexistant'})
                        break;

                    default:
                        return res.status(403)
                        break;
                }
            }
        })

}

//USER POST
exports.userPost = (req, res) => {
    const id = req.params.id
    const current_page = req.query.page ? req.query.page : 1

    Post.paginate({
        where : {
            userId : req.params.id
        },
        page: req.query.page,
        order : [['createdAt', 'DESC']],
        paginate : 10
        , include: [{
            model: User,
            attributes: ['lastName', 'firstName', 'profilImgUrl']
        }, {
            model: userLiked,
            where: {
                userId: {
                    [Op.eq]: req.session.userId
                }
            },
            attributes: ['type'],
            required: false
        }
        ]
    })
    .then(posts => {
        const prev = current_page === 1 ? process.env.BASE_URL + '/api/'+ req.params.id +'/post?page=1' : process.env.BASE_URL + '/api/post?page=' + (current_page-1)
        const next = current_page === posts.pages.toString() ? process.env.BASE_URL + '/api/'+ req.params.id +'/post?page='+posts.pages : process.env.BASE_URL + '/api/post?page=' + (current_page+1)
        const links = {
            prev,
            next,
            first: process.env.BASE_URL +'/api/post?page=1',
            last : process.env.BASE_URL + '/api/post?page=' + posts.pages
        }
        res.status(200).json({...posts, posts : posts.docs, current_page, links})
    })
    .catch(error => {
        logger.write(error)
        res.status(500).json({message : "Erreur lors de la récupération des données."})
    })
}