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
User.belongsTo(userRole, { foreignKey: { name: "roleId", allowNull: false } })

Comments.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } })
Comments.belongsTo(Post, { foreignKey: { name: 'postId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hooks: true  })


commentLiked.belongsTo(Comments, { foreignKey: { name: 'commentId', allowNull: false } ,foreignKeyConstraint: true, onDelete: 'CASCADE', hooks: true })
commentLiked.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hooks: true  })

Post.belongsTo(groups, { foreignKey: { name: 'groupId'},foreignKeyConstraint: true, onDelete: 'CASCADE', hooks: true })
Post.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hooks: true })


userLiked.belongsTo(User, { allowNull: false, foreignKey: { name: 'userId' } })
userLiked.belongsTo(Post, { allowNull: false, foreignKey: { name: 'postId' } })

noctification.belongsTo(User, { as: 'creator', foreignKey: { name: 'creator_id' } })
noctification.belongsTo(User, { as: 'notified', foreignKey: { name: 'notified_id' } })
noctification.belongsTo(groups, { foreignKey: { name: 'groupId' } })

groupMembers.belongsTo(groupRole, { foreignKey: { name: 'role' } })

follow.belongsTo(User, { foreignKey: 'follower' })
follow.belongsTo(User, { foreignKey: 'followed' })

groupMembers.belongsTo(User, { foreignKey: { name: 'userId' }, allowNull: false })
groupMembers.belongsTo(groups, { foreignKey: { name: 'groupId' }, allowNull: false })


userRole.hasMany(User, { foreignKey: { name: "roleId", allowNull: false } })
Comments.hasMany(commentLiked, { foreignKey: { name: 'commentId', allowNull: false },foreignKeyConstraint: true, onDelete: 'CASCADE', hooks: true  })
groups.hasMany(groupMembers, { foreignKey: { name: 'groupId' },foreignKeyConstraint: true, onDelete: 'CASCADE', hooks: true  })
Post.hasMany(userLiked, { foreignKey: { allowNull: false, name: 'postId' }, onDelete: 'CASCADE', hooks: true })
Post.hasMany(Comments, { foreignKey: { allowNull: false, name: 'postId' }, onDelete: 'CASCADE', hooks: true })
User.hasMany(commentLiked, { foreignKey: { name: "userId" }, allowNull: false })
User.hasMany(Post, { foreignKey: { name: 'userId', allowNull: false } })
User.hasMany(groupMembers, { foreignKey: { name: 'userId' }, allowNull: false })
User.hasMany(userLiked, { allowNull: false, foreignKey: { name: 'userId' } })
User.hasMany(Comments, { allowNull: false, foreignKey: { name: 'userId' } })
User.hasMany(noctification, { as: 'creator', foreignKey: { name: 'creator_id' } })
User.hasMany(noctification, { as: 'notified', foreignKey: { name: 'notified_id' } })
groups.hasMany(noctification, { foreignKey: { name: 'groupId' } })
groups.hasMany(Post, { foreignKey: { name: 'groupId' } })
groupRole.hasMany(groupMembers, { foreignKey: { name: 'role' } })


userRole.create({
    roleId: 1,
    description: "admin"
})
.catch(error => console.log(error))

userRole.create({
    roleId: 2,
    description: "user"
})
.catch(error => console.log(error))


bcrypt.hash(process.env.ADMIN_PASSWORD, 10 )
.then((hash)=>{
    User.create({
        lastName: process.env.ADMIN_LASTNAME,
        firstName: process.env.ADMIN_FIRSTNAME,
        email : process.env.ADMIN_EMAIL,
        password : hash,
        roleId: 1
    })
    .catch(error => console.log(error))
})