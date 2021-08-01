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

INSERT INTO comments VALUES (1,1,1,'Hello les amis !','2021-07-30 18:00:00','2021-07-30 18:00:00');

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

INSERT INTO users VALUES (1,'FranckF5683','silver56@orange.fr',' Zedrftg12,','Franck.jpg', 1, 1);



