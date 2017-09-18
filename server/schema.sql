CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  text CHAR(25),
  -- username CHAR(25),
  room CHAR(25)
  -- FOREIGN KEY (room_id)
  --   REFERENCES rooms(id),
  FOREIGN KEY (username_id)
    REFERENCES users(id)
);

/* Create other tables and define schemas for them here! */

-- CREATE TABLE rooms (
--   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--   name CHAR(25)
-- );
--
CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username CHAR(25)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

 -- TO DROP TABLE EXECUTE: drop table if exists <table name>;
