drop database if exists chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username CHAR(255),
  CONSTRAINT username_unique UNIQUE (username)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  text CHAR(255),
  -- username CHAR(25),
  roomname CHAR(255),
  -- FOREIGN KEY (room_id)
  --   REFERENCES rooms(id),
  username_id INT,
  FOREIGN KEY (username_id)
    REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 -- TO DROP TABLE EXECUTE: drop table if exists <table name>;
