const { Post, Comments, userLiked, commentLiked } = require('./post')
const User = require('./users')
const noctification = require('./noctification.js')
const { groups, groupMembers, groupRole } = require('./group')
const department = require('./department')
const follow = require('./follow')
const userRole = require('./role.js')
const {admin} = require('./admin')
const bcrypt = require('bcrypt')

//associations
User.belongsTo(userRole, { foreignKey: { name: "roleId", allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true})

Comments.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
Comments.belongsTo(Post, { foreignKey: { name: 'postId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true  })


commentLiked.belongsTo(Comments, { foreignKey: { name: 'commentId', allowNull: false } ,foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
commentLiked.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true  })

Post.belongsTo(groups, { foreignKey: { name: 'groupId'},foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
Post.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })


userLiked.belongsTo(User, { allowNull: false, foreignKey: { name: 'userId' },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
userLiked.belongsTo(Post, { allowNull: false, foreignKey: { name: 'postId' },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })

noctification.belongsTo(User, { as: 'creator', foreignKey: { name: 'creator_id' },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
noctification.belongsTo(User, { as: 'notified', foreignKey: { name: 'notified_id' },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
noctification.belongsTo(groups, { foreignKey: { name: 'groupId' },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })

groupMembers.belongsTo(groupRole, { foreignKey: { name: 'role' },foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })

follow.belongsTo(User, { foreignKey: 'follower',foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
follow.belongsTo(User, { foreignKey: 'followed',foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })

groupMembers.belongsTo(User, { foreignKey: { name: 'userId' }, allowNull: false,foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })
groupMembers.belongsTo(groups, { foreignKey: { name: 'groupId' }, allowNull: false,foreignKeyConstraint: true, onDelete: 'CASCADE', hook: true })


userRole.hasMany(User, { foreignKey: { name: "roleId", allowNull: false } })
Comments.hasMany(commentLiked, { foreignKey: { name: 'commentId', allowNull: false } })
groups.hasMany(groupMembers, { foreignKey: { name: 'groupId' } })
Post.hasMany(userLiked, { foreignKey: { allowNull: false, name: 'postId' }})
Post.hasMany(Comments, { foreignKey: { allowNull: false, name: 'postId' } })
User.hasMany(commentLiked, { foreignKey: { name: "userId" }, allowNull: false })
User.hasMany(Post, { foreignKey: { name: 'userId', allowNull: false }})
User.hasMany(groupMembers, { foreignKey: { name: 'userId' }, allowNull: false })
User.hasMany(userLiked, { allowNull: false, foreignKey: { name: 'userId' } })
User.hasMany(Comments, { allowNull: false, foreignKey: { name: 'userId' }})
User.hasMany(noctification, { as: 'creator', foreignKey: { name: 'creator_id' } })
User.hasMany(noctification, { as: 'notified', foreignKey: { name: 'notified_id' }})
groups.hasMany(noctification, { foreignKey: { name: 'groupId' }})
groups.hasMany(Post, { foreignKey: { name: 'groupId' }})
groupRole.hasMany(groupMembers, { foreignKey: { name: 'role' } })