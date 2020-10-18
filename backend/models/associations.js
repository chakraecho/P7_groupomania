const { Post, Comments, userLiked, commentLiked } = require('./post')
const User = require('./users')
const noctification = require('./noctification.js')
const { groups, groupMembers, groupRole } = require('./group')
const department = require('./department')
const follow = require('./follow')

//associations

Comments.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } })
Comments.belongsTo(Post, { foreignKey: { name: 'postId', allowNull: false } })


commentLiked.belongsTo(Comments, { foreignKey: { name: 'commentId', allowNull: false } })
commentLiked.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } })

Post.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } })


userLiked.belongsTo(User, { allowNull: false, foreignKey: { name: 'userId' } })
userLiked.belongsTo(Post, { allowNull: false, foreignKey: { name: 'postId' } })

noctification.belongsTo(User, {as: 'creator',foreignKey: {name: 'creator_id'}})
noctification.belongsTo(User, {as: 'notified',foreignKey: {name: 'notified_id'}})
noctification.belongsTo(groups, {foreignKey: { name: 'groupId' }})

groupMembers.belongsTo(groupRole, { foreignKey: { name: 'role'}})

follow.belongsTo(User, { foreignKey: 'follower' })
follow.belongsTo(User, { foreignKey: 'followed' })

groupMembers.belongsTo(User, { foreignKey: { name: 'userId' }, allowNull: false })
groupMembers.belongsTo(groups, { foreignKey: { name: 'groupId' }, allowNull: false })


Comments.hasMany(commentLiked,{ foreignKey: { name: 'commentId', allowNull: false }})
groups.hasMany(groupMembers, { foreignKey: { name: 'groupId' }, allowNull: false })
Post.hasMany(userLiked, { allowNull: false, foreignKey: { name: 'postId' } })
User.hasMany(commentLiked, {foreignKey : {name : "userId"}, allowNull : false})
User.hasMany(Post, { foreignKey: { name: 'userId', allowNull: false } })
User.hasMany(groupMembers, {foreignKey: { name: 'userId' }, allowNull: false})
User.hasMany(userLiked, { allowNull: false, foreignKey: { name: 'userId' } })
User.hasMany(Comments, { allowNull: false, foreignKey: { name: 'userId' } })
User.hasMany(noctification, {as: 'creator',foreignKey: {name: 'creator_id'}})
User.hasMany(noctification, {as: 'notified', foreignKey: {name: 'notified_id'}})
groups.hasMany(noctification, {foreignKey: {name: 'groupId'}})
groupRole.hasMany(groupMembers, {foreignKey: {name: 'role'}})