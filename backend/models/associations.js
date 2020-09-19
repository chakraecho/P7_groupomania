const {Post, Comments, userLiked, commentLiked} = require('./post')
const User = require('./users')
const noctification = require('./noctification.js')
const {groups, groupMembers} = require('./group')
const department = require('./department')
const {follow} = require('./follow')

//associations

Comments.belongsTo(User, {foreignKey:{name:'userId', allowNull: false}})
Comments.belongsTo(Post, {foreignKey:{name:'postId', allowNull: false}})


commentLiked.belongsTo(Comments,{foreignKey:{name:'id', allowNull: false}})

Post.belongsTo(User, {foreignKey:{name:'userId', allowNull:false}})


userLiked.belongsTo(User,{ allowNull: false,foreignKey:'userId'})
userLiked.belongsTo(Post, {allowNull: false,foreignKey:'postId'})

noctification.belongsTo(User, {as: 'from'})
noctification.belongsTo(User, {as: 'to'})

follow.belongsTo(User,{as:'from'})
follow.belongsTo(User, {as:'to'})

groups.belongsTo(User, {foreignKey:'userId', allowNull: false, as:'admin'})
groupMembers.belongsTo(User,{foreignKey:'userId', allowNull:false})
groupMembers.belongsTo(groups,{foreignKey:'groupId', allowNull:false})


Comments.hasMany(commentLiked)
groups.hasMany(groupMembers)
Post.hasMany(userLiked)
User.hasMany(Post)
User.hasMany(groupMembers)
User.hasMany(noctification)
User.hasMany(userLiked)
User.hasMany(Comments)

