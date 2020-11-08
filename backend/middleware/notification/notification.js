const { groups, groupMembers, groupRole } = require('../../models/group')
const notification = require('../../models/noctification')
const follow = require('../../models/follow')
const { Comments, commentLiked, Post } = require('./../../models/post')
const fs = require('fs')


var logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })


exports.newGroupPostNotification = (req) => {
    groupMembers.findAll({
        where: {
            groupId: req.params.id
        }
    })
        .then(members => {
            let filterMembers = []
            for (let member of members) {
                const memberId = member.dataValues.userId
                if(memberId !== req.session.userId){
                    filterMembers.push({
                        type: "group_post",
                        creator_id: req.session.userId,
                        notified_id: memberId,
                        groupId: req.params.id
                    })
                }
            }

            notification.bulkCreate(filterMembers)
                .catch(error => console.log(error))

        })
        .catch(error => {
            console.log(error)
        })
}

exports.newPostNotification = (req) => {
    follow.findAll({
        where: {
            followed: req.session.userId
        }
    })
        .then(members => {
            let filterMembers = []
            for (let member of members) {
                const memberId = member.follower
                if(memberId !== req.session.userId){
                    filterMembers.push({
                        type: "post",
                        creator_id: req.session.userId,
                        notified_id: memberId,
                        groupId: req.params.id
                    })
                }
            }

            notification.bulkCreate(filterMembers)
                .catch(error => logger.write(error))
        })
}

exports.commentNotification = (req) => {
    const postId = req.params.id
    let users = []
    Comments.findAll({
        where: {
            postId
        }
    }).then(results => {
        for (let result of results) {
            if (!users.includes(result.userId)) {
                users.push({
                    notified_id: result.userId,
                    type: "post",
                    creator_id: req.session.userId
                })
            }
        }
    }).then(() => {
        commentLiked.findAll({
            where: {
                postId
            }
        }).then(results => {
            for (let result of results) {
                if (!users.includes(result.userId)) {
                    uusers.push({
                        notified_id: result.userId,
                        type: "post",
                        creator_id: req.session.userId
                    })
                }
            }
        })
    }).then(() => {
        Post.findOne({
            where: { postId }
        })
            .then(result => {
                if (!users.includes(result.userId)) {
                    uusers.push({
                        notified_id: result.userId,
                        type: "post",
                        creator_id: req.session.userId
                    })
                }
            })
    }).then(() => {
        notification.bulkCreate(users)
            .catch(error => logger.write(error))
    })
}