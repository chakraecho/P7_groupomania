const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../db-config');
const User = require('./../models/users')

const Post = sequelize.define('Post', {
    postId:{type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    content: {type: Sequelize.TEXT, allowNull: false},
    like:{type: Sequelize.INTEGER },
    dislike:{type: Sequelize.INTEGER},
    imgUrl:{type:Sequelize.TEXT}
    
},
{
    indexes: [
      // add a FULLTEXT index
      { type: 'FULLTEXT', name: 'content', fields: ['content'] }
    ]
  });



const Comments = sequelize.define('Comments',{
    content:{type: Sequelize.TEXT, allowNull:false}
})


const userLiked = sequelize.define('userLiked',{
    type:{type :Sequelize.BOOLEAN}
})

//associations

Comments.belongsTo(User, {foreignKey:'userId', allowNull: false})
Comments.belongsTo(Post, {foreignKey:'postId', allowNull: false})


User.hasMany(Post, {foreignKey: 'userId'})
Post.belongsTo(User, {foreignKey:'userId', allowNull: false})


userLiked.belongsTo(User,{foreignKey:'userId', allowNull: false})
userLiked.belongsTo(Post, {foreignKey:'postId', allowNull: false})

exports.Comments = Comments
exports.Post = Post;
exports.userLiked = userLiked