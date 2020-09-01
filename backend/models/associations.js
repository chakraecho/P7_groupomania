const {Post, Comments, userLiked} = require('./post')
const User = require('./users')
const noctification = require('./noctification.js')
const {group, groupMembers} = require('./group')
const department = require('./department')

//associations

Comments.belongsTo(User, {foreignKey:'userId', allowNull: false})
Comments.belongsTo(User, {foreignKey:'postId', allowNull: false})


Post.belongsTo(User, {foreignKey:'userId', allowNull: false})


userLiked.belongsTo(User,{foreignKey:'userId', allowNull: false})
userLiked.belongsTo(Post, {foreignKey:'postId', allowNull: false})

noctification.belongsTo(User, {foreignKey: 'from', allowNull: false})
noctification.belongsTo(User, {foreignKey: 'to', allowNull: false})


group.belongsTo(User, {foreignKey:'userId', allowNull: false, name:'admin'})
groupMembers.belongsTo(User,{foreignKey:'userId', allowNull:false})
groupMembers.belongsTo(group,{foreignKey:'groupId', allowNull:false})

group.hasMany(groupMembers)
User.hasMany(Post)
User.hasMany(groupMembers)
User.hasMany(noctification)
User.hasMany(userLiked)
User.hasMany(Comments)

