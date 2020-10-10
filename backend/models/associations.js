const {Post, Comments, userLiked, commentLiked} = require('./post')
const User = require('./users')
const noctification = require('./noctification.js')
const {groups, groupMembers} = require('./group')
const department = require('./department')
const follow = require('./follow')

//associations

Comments.belongsTo(User, {foreignKey:{name:'userId', allowNull: false}})
Comments.belongsTo(Post, {foreignKey:{name:'postId', allowNull: false}})


commentLiked.belongsTo(Comments,{foreignKey:{name:'id', allowNull: false}})

Post.belongsTo(User, {foreignKey:{name:'userId', allowNull:false}})


userLiked.belongsTo(User,{ allowNull: false,foreignKey:'userId'})
userLiked.belongsTo(Post, {allowNull: false,foreignKey:'postId'})

noctification.belongsTo(User, {as:'notified', foreignKey:'notified_id'})
noctification.belongsTo(User, {as:'creator', foreignKey:'creator_id'})

follow.belongsTo(User,{foreignKey:'follower'})
follow.belongsTo(User, {foreignKey:'followed'})

groupMembers.belongsTo(User,{foreignKey:'userId', allowNull:false})
groupMembers.belongsTo(groups,{foreignKey:'groupId', allowNull:false})


Comments.hasMany(commentLiked)
groups.hasMany(groupMembers)
Post.hasMany(userLiked)
User.hasMany(Post)
User.hasMany(groupMembers)
User.hasMany(userLiked)
User.hasMany(Comments)

