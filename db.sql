-- drop futurelab database if exits
DROP DATABASE FutureLab if EXISTS;

-- create futurelab database if exits
CREATE DATABASE FutureLab;

-- create users tables
-- users table
CREATE TABLE `futurelab`.`users` ( `userId` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(30) NOT NULL , `password` VARCHAR(30) NOT NULL , `grade` ENUM("sec", "com", "lab", "med") NOT NULL , PRIMARY KEY (`userId`), UNIQUE (`email`(30))) ENGINE = InnoDB; 
-- patients table
CREATE TABLE `futurelab`.`patients` ( `patientId` INT(10) NOT NULL AUTO_INCREMENT , `nom` VARCHAR(30) NOT NULL , `prenom` VARCHAR(30) NOT NULL , `sexe` ENUM("male","female") NOT NULL , `dn` DATE NOT NULL , `numero` VARCHAR(10) NOT NULL , PRIMARY KEY (`patientId`)) ENGINE = InnoDB; 
-- analyse table
CREATE TABLE `futurelab`.`analyse` ( `analyseId` INT NOT NULL AUTO_INCREMENT , `nom` VARCHAR(50) NOT NULL , PRIMARY KEY (`analyseId`)) ENGINE = InnoDB; 
-- analyse_patients table
CREATE TABLE `futurelab`.`analyse_patients` ( `analyseId` INT NOT NULL , `patientId` INT NOT NULL , UNIQUE `analyseId` (`analyseId`), UNIQUE `patientId` (`patientId`)) ENGINE = InnoDB; 
ALTER TABLE `analyse_patients` ADD CONSTRAINT `analysefk` FOREIGN KEY (`analyseId`) REFERENCES `analyse`(`analyseId`) ON DELETE CASCADE ON UPDATE CASCADE; 
ALTER TABLE `analyse_patients` ADD CONSTRAINT `patientfk` FOREIGN KEY (`patientId`) REFERENCES `patients`(`patientId`) ON DELETE RESTRICT ON UPDATE RESTRICT; 




-- insert user into table
INSERT INTO `users` (`userid`, `email`, `password`, `grade`) VALUES (NULL, 'kira@oussama.com', 'kiraoussama', 'sec');
