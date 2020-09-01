const {Post, Comments, userLiked} = require('./post')
const User = require('./users')
const noctification = require('./noctification.js')
const {groups, groupMembers} = require('./group')
const department = require('./department')

//associations

Comments.belongsTo(User, {as:'userId', allowNull: false})
Comments.belongsTo(Post, {as:'postId', allowNull: false})


Post.belongsTo(User, {as:'userId', allowNull: false})


userLiked.belongsTo(User,{ allowNull: false,foreignKey:'userId'})
userLiked.belongsTo(Post, {allowNull: false,foreignKey:'postId'})

noctification.belongsTo(User, {as: 'from'})
noctification.belongsTo(User, {as: 'to'})


groups.belongsTo(User, {foreignKey:'userId', allowNull: false, as:'admin'})
groupMembers.belongsTo(User,{as:'userId', allowNull:false})
groupMembers.belongsTo(groups,{as:'groupId', allowNull:false})

groups.hasMany(groups)
User.hasMany(Post)
User.hasMany(groupMembers)
User.hasMany(noctification)
User.hasMany(userLiked)
User.hasMany(Comments)

