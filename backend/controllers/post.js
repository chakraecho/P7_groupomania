const { Post, Comments, userLiked, commentLiked } = require('./../models/post')
const User = require('./../models/users')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const noctification = require('./../models/noctification')
const follow = require('./../models/follow')
const { groupMembers } = require('./../models/group')


exports.createOne = (req, res, next) => {
    const body = JSON.parse(req.body.body)
    if (req.files) {
        Post.create({
            content: body.content, like: 0, dislike: 0, userId: req.session.userId,
            imgUrl: `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`
        })
            .then(() => res.status(201).json({ message: 'post créé !' }))
            .then(() => follow.findAll({
                where: {
                    followed: req.session.userId
                }
            }).then(result => {
                if (result.length !== 0) {
                    result.forEach(element => {
                        const followed = element.dataValues.followed
                        const follower = element.dataValues.follower
                        noctification.create({ type: 'post', notified_id: follower, creator_id: followed, seen: 0 })
                            .catch(error => console.log({ error }))
                    })
                }
            })
            )
            .catch(error => res.status(500).json({ error }))
    }
    else {
        Post.create({ content: body.content, like: 0, dislike: 0, userId: req.session.userId })
            .then(() => res.status(201).json({ message: 'post créé !' }))
            .then(() => follow.findAll({
                where: {
                    followed: req.session.userId
                }
            }).then(result => {
                if (result.length !== 0) {
                    result.forEach(element => {
                        const followed = element.dataValues.followed
                        const follower = element.dataValues.follower
                        noctification.create({ type: 'post', notified_id: follower, creator_id: followed, seen: 0 })
                            .catch(error => console.log({ error }))
                    })
                }
            })
            )
            .catch(error => res.status(500).json({ error }))
    }

}
exports.postGroup = (req, res) => {    //create a post linked followed a group
    Post.create({ content: req.body.content, like: 0, dislike: 0, userId: req.body.userId, groupId: req.params.id })
        .then(() => res.status(201).json({ message: 'post créé !' }))
        .then(() => groupMembers.findAll({
            where: {
                groupId: req.params.id
            },
            attributes: ['userId']
        }).then(result => {
            console.log(result)
            if (result.length !== 0) {
                result.forEach(element => {
                    const followed = req.session.userId
                    const follower = element.dataValues.userId
                    if (followed !== follower) {
                        noctification.create({ type: 'group_post', notified_id: follower, creator_id: followed, seen: 0, groupId: req.params.id })
                            .catch(error => console.log({ error }))
                    }
                })
            }
        })
        )
        .catch(error => res.status(500).json({ error }))

}

exports.getOne = (req, res, next) => {
    Post.findOne({ where: { postId: req.params.id } })
        .then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }))
}

exports.getAll = (req, res, next) => {
    Post.findAll({
        limit: 10, order: [['updatedAt', 'DESC']], include: [{
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
            return res.status(200).json({ posts })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.getAllfromGroups = (req, res, next) => {
    Post.findAll({
        where: { groupId: { [Op.eq]: req.params.id } },
        limit: 10, order: [['updatedAt', 'DESC']], include: [{
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
            return res.status(200).json({ posts })
        })
        .catch(error => res.status(404).json({ error }))
}

exports.modifyOne = (req, res, next) => {

    const postId = req.params.id
    const id = req.session.email
    const content = req.body.content

    Post.update({ content }, {
        where: { postId }
    })
        .then(()=>{
            Post.findOne({where :{postId : req.params.id}, include: [{
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
            ]})
            .then(post => res.status(200).json({post}))
            .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

exports.deleteOne = (req, res) => {
    const postId = req.params.id
    Post.destroy({ where: { postId: postId }, include: [Comments, userLiked] })
        .then(() => res.status(200).json({ message: 'post supprimé !' }))
        .catch((error) => res.status(500).json({ error }))
}

// COMMENT

exports.getComment = (req, res) => {
    const postId = req.params.id
    Comments.findAll({
        where: { postId: postId },
        include: [{ model: User, attributes: ['lastName', 'firstName', 'profilImgUrl'] },
        { model: commentLiked, attributes: ['type'], where: { userId: req.session.userId }, required: false }]
    })
        .then(comment => res.status(200).json({ comment }))
        .catch(error => res.status(500).json(error))
}

exports.createComment = (req, res) => {
    const postId = req.params.id
    Comments.create({
        content: req.body.content,
        postId: req.params.id,
        userId: req.body.userId
    })
        .then(comment => res.status(201).json({ comment }))
        .catch(error => res.status(500).json({ error }))
}

exports.modifyComment = (req, res) => {
    const content = req.body.content
    Comments.update({ content }, {
        where: { commentId: req.params.id }
    })
        .then(comment => {
            Comments.findOne({where : {commentId :req.params.id}, include:[{
                model:User
            }, {
                model : commentLiked,
                attributes : ['type']
            }]})
            .then(comment => {
                res.status(200).json({comment})
            })
            .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.deleteComment = (req, res) => {
    const id = req.params.id
    Comments.destroy({ where: { commentId: id } })
        .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
        .catch(error => res.status(500).json({ error }))
}


exports.like = (req, res) => {
    const id = req.params.id
    const userId = req.session.userId
    const like = req.body.like
    let bool;
    if (like === 1) {
        bool = true
    }
    else if (like === -1) {
        bool = false
    }
    userLiked.findAll({ where: { [Op.and]: [{ userId }, { postId: id }] } })
        .then(liked => {
            if (liked.length >= 1) {
                if (like === 0) {
                    userLiked.findOne({ where: { [Op.and]: [{ postId: id }, { userId: userId }] }, attributes: ['type'] })
                        .then(like => {
                            switch (like.dataValues.type) {
                                case true:
                                    Post.findAll({ where: { postId: id } })
                                        .then(option => option[0].decrement('like')
                                            .then(() => {
                                                userLiked.destroy({ where: { [Op.and]: [{ postId: id }, { userId: userId }] } })
                                                    .then(() => {
                                                        Post.findOne({
                                                            where: { postId: id }, include: [{
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
                                                            .then(post => { res.status(200).json({ post }) })
                                                            .catch(error => res.status(404).json({ error }))
                                                    })
                                                    .catch(error => res.status(409).json({ error }))
                                            }))
                                        .catch(error => console.log(error))
                                    break;
                                case false:
                                    Post.findAll({ where: { postId: id } })
                                        .then(option => option[0].decrement('dislike')
                                            .then(() => {
                                                userLiked.destroy({ where: { [Op.and]: [{ postId: id }, { userId: userId }] } })
                                                    .then(() => {
                                                        Post.findOne({
                                                            where: { postId: id }, include: [{
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
                                                            .then(post => res.status(200).json({ post }))
                                                            .catch(error => res.status(404).json({ error }))
                                                    })
                                                    .catch(error => res.status(409).json({ error }))
                                            }))
                                        .catch(error => console.log(error))
                                    break;
                            }
                        })
                        .catch(error => console.log(error))

                }
                else if (like !== 0) {
                    res.status(409).json({ message: 'like déjà existant' })
                }

            }
            else if (liked.length === 0) {
                switch (like) {
                    case 1:
                        userLiked.create({ postId: id, userId: userId, type: true })
                            .then(() => {
                                Post.findAll({
                                    where: { postId: id }, include: [{
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
                                                where: { postId: id }, include: [{
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
                                                .then(post => res.status(200).json({ post }))
                                                .catch(error => res.status(404).json({ error })))
                                            .catch(error => console.log(error))

                                    })
                                    .catch(error => res.status(404).json({ error }))
                            })
                            .catch(error => res.status(409).json({ message: 'vous avez déjà liké', error }))
                        break;

                    case -1:
                        userLiked.create({ postId: id, userId: userId, type: false })
                            .then(() => Post.findAll({
                                where: { postId: id }, include: [{
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
                                            where: { postId: id }, include: [{
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
                                            .then(post => res.status(200).json({ post }))
                                            .catch(error => res.status(404).json({ error })))
                                        .catch(error => console.log(error))
                                })
                                .catch(error => res.status(404).json({ error })))
                            .catch(error => res.status(409).json({ message: 'vous avez déjà liké', error }))
                        break;
                    case 0:
                        res.status(404).json({ message: 'like inexistant' })
                        break;

                    default:
                        return res.status(403)
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
    }
    else if (like === -1) {
        bool = false
    }
    commentLiked.findAll({ where: { [Op.and]: [{ userId }, { commentId: id }] } })
        .then(liked => {
            if (liked.length >= 1) {
                if (like === 0) {
                    commentLiked.findOne({ where: { [Op.and]: [{ commentId: id }, { userId: userId }] }, attributes: ['type'] })
                        .then(like => {
                            switch (like.dataValues.type) {
                                case true:
                                    Comments.findAll({ where: { [Op.and]: [{ commentId: id }] } })
                                        .then(option => option[0].decrement('like')
                                            .then(() => {
                                                commentLiked.destroy({ where: { [Op.and]: [{ commentId: id }, { userId: userId }] }, })
                                                    .then(() => {
                                                        Comments.findOne({
                                                            where: { commentId: id }, include: [{
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
                                                            .then(comment => { res.status(200).json({ comment }) })
                                                            .catch(error => res.status(404).json({ error }))
                                                    })
                                                    .catch(error => res.status(409).json({ error }))
                                            }))
                                        .catch(error => console.log(error))
                                    break;
                                case false:
                                    Comments.findAll({ where: { [Op.and]: [{ commentId: id }] } })
                                        .then(option => option[0].decrement('dislike')
                                            .then(() => {
                                                commentLiked.destroy({ where: { [Op.and]: [{ commentId: id }, { userId: userId }] } })
                                                    .then(() => {
                                                        Comments.findOne({
                                                            where: { commentId: id }, include: [{
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
                                                            .then(comment => res.status(200).json({ comment }))
                                                            .catch(error => res.status(404).json({ error }))
                                                    })
                                                    .catch(error => res.status(409).json({ error }))
                                            }))
                                        .catch(error => console.log(error))
                                    break;
                            }
                        })
                        .catch(error => console.log(error))

                }
                else if (like !== 0) {
                    res.status(409).json({ message: 'like déjà existant' })
                }

            }
            else if (liked.length === 0) {
                switch (like) {
                    case 1:
                        commentLiked.create({ commentId: id, userId: userId, type: true })
                            .then(() => {
                                Comments.findAll({
                                    where: { commentId: id }, include: [{
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
                                                where: { commentId: id }, include: [{
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
                                                .then(comment => res.status(200).json({ comment }))
                                                .catch(error => res.status(404).json({ error })))
                                            .catch(error => console.log(error))

                                    })
                                    .catch(error => res.status(404).json({ error }))
                            })
                            .catch(error => res.status(409).json({ message: 'vous avez déjà liké', error }))
                        break;

                    case -1:
                        commentLiked.create({ commentId: id, userId: userId, type: false })
                            .then(() => Comments.findAll({
                                where: { commentId: id }, include: [{
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
                                            where: { commentId: id }, include: [{
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
                                            .then(comment => res.status(200).json({ comment }))
                                            .catch(error => res.status(404).json({ error })))
                                        .catch(error => console.log(error))
                                })
                                .catch(error => res.status(404).json({ error })))
                            .catch(error => res.status(409).json({ message: 'vous avez déjà liké', error }))
                        break;
                    case 0:
                        res.status(404).json({ message: 'like inexistant' })
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
    Post.findAll({
        where: { userId: id }, limit: 10, order: [['updatedAt', 'DESC']], include: [{
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
            res.status(200).json({ posts })
        })
}