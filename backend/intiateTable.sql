CREATE DATABASE  groupomania charset=utf8;
USE groupomania;

CREATE TABLE users(
    id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    familyName VARCHAR(30) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    description TEXT,
    imgUrl TEXT,
    accountId INT NOT NULL FOREIGN KEY REFERENCES account(accountId)
);

CREATE TABLE account(
    accountId SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    /* change identity to auto_incerment and add unsigned
     if you are using MySQL */
    email VARCHAR(60) NOT NULL UNIQUE,
    password TEXT NOT NULL
);



CREATE TABLE post(
    userId SMALLINT NOT NULL FOREIGN KEY REFERENCES users(id),
    postId PRIMARY KEY INT UNSIGNED AUTO_INCREMENT,
    content TEXT NOT NULL,
    like SMALLINT,
    dislike SMALLINT
);

CREATE TABLE postComment(
    userId SMALL INT NOT NULL FOREIGN KEY REFERENCES users(id),
    comment TEXT NOT NULL,
    postId INT FOREIGN KEY post(postId)
);