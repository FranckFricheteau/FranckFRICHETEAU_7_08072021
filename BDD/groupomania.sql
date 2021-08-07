/*Table comments */

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  message_id INT NOT NULL,
  comment VARCHAR(255),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id)
  
) 
ENGINE=InnoDB;

LOCK TABLES comments WRITE; /*Verrouille la table */

INSERT INTO comments VALUES (1,1,1,'Hello les amis !','2021-07-30 18:00:00','2021-07-30 18:00:00');

UNLOCK TABLES; /*Déverrouille toutes les tables */

/*Table users */


DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  pseudo VARCHAR(55) DEFAULT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  profilPic VARCHAR(255) DEFAULT NULL,
  isAdmin TINYINT(1) NOT NULL DEFAULT '0',
  isActive TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (id),
  KEY uniqueEmail (email)
) 
ENGINE=InnoDB;

LOCK TABLES users WRITE; 

INSERT INTO users VALUES (1,'FranckF5683','silver56@orange.fr',' Zedrftg12,','FranckF5683.jpg', 1, 1);

UNLOCK TABLES;

/*Table message_reaction_user */

DROP TABLE IF EXISTS message_reaction_user;

CREATE TABLE message_reaction_user (
  user_id INT NOT NULL AUTO_INCREMENT,
  message_id INT NOT NULL,
  reaction_id INT NOT NULL,
  PRIMARY KEY (user_id,message_id,reaction_id),
  KEY fk_reactions_users1_idx (user_id),
  KEY fk_reactions_messages1_idx (message_id),
  KEY fk_reactions_reactions1_idx (reaction_id)
) 
ENGINE=InnoDB;

LOCK TABLES message_reaction_user WRITE;

INSERT INTO message_reaction_user VALUES (1, 1, 1);

UNLOCK TABLES;

/*Table messages */


DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  content VARCHAR (255) NOT NULL,
  image VARCHAR (255) DEFAULT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  isActive TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (id)  
) 
ENGINE=InnoDB;

LOCK TABLES messages WRITE;

INSERT INTO messages VALUES (1,1,'Bienvenue sur Groupomania :)\nVous pouvez dès à présent partager des messages avec ou sans images et commenter les messages de vos collègues.\nEn tant qu’administrateur du réseau social, je veillerai au respect des règles.','http://localhost:3000/images/welcome1617113496058.jpg','2021-07-30 14:50:00','2021-07-30 14:50:00',1);

UNLOCK TABLES;

/* Table reaction_type_id */

DROP TABLE IF EXISTS reaction_type_id;

CREATE TABLE reaction_type_id (
id INT NOT NULL AUTO_INCREMENT,
reaction VARCHAR (55) NOT NULL,
PRIMARY KEY (id)
)
ENGINE=InnoDB;

LOCK TABLES reaction_type_id WRITE;

INSERT INTO reaction_type_id VALUES (1,'like'),(2,'dislike');

UNLOCK TABLES;



