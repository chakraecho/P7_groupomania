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

noctification.belongsTo(User, {foreignKey:{name:""}})
noctification.belongsTo(User,{foreignKey:'notified'})

follow.belongsTo(User,{foreignKey:'from'})
follow.belongsTo(User, {foreignKey:'to'})

groups.belongsTo(User, { allowNull: false, foreignKey:'admin'})
groupMembers.belongsTo(User,{foreignKey:'userId', allowNull:false})
groupMembers.belongsTo(groups,{foreignKey:'groupId', allowNull:false})


Comments.hasMany(commentLiked)
groups.hasMany(groupMembers)
Post.hasMany(userLiked)
User.hasMany(Post)
User.hasMany(groupMembers)
User.hasMany(noctification, {foreignKey: 'creator'})
User.hasMany(noctification, {foreignKey: 'notified'})
User.hasMany(userLiked)
User.hasMany(Comments)

