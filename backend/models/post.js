const Sequelize = require("sequelize");

const Post = sequelize.define('Post', {
    postId:{type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    content: {type: Sequelize.TEXT, allowNull: false},
    like:{type: Sequelize.INTEGER },
    dislike:{type: Sequelize.INTEGER},
    creation:{type:Sequelize.DATE, allowNull:false}
});

exports.Post = Post;

const Comments = sequelize.define('Comments',{
    content:{type: Sequelize.TEXT, allowNull:false}
})

Comments.belongsTo(User)
Comments.belongsTo(Post)

exports.Comments = Comments

const userLiked = sequelize.define('userLiked',{
    type:{type :Sequelize.BOOLEAN}
})

userLiked.belongsTo(User)
userLiked.belongsTo(Post)

exports.userLiked = userLiked