-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  jeu. 18 juin 2020 à 19:30
-- Version du serveur :  8.0.18
-- Version de PHP :  7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `futurelab`
--

-- --------------------------------------------------------

--
-- Structure de la table `analyse`
--

DROP TABLE IF EXISTS `analyse`;
CREATE TABLE IF NOT EXISTS `analyse` (
  `analyseId` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8_bin NOT NULL,
  `prix` float NOT NULL,
  PRIMARY KEY (`analyseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `analyse_patients`
--

DROP TABLE IF EXISTS `analyse_patients`;
CREATE TABLE IF NOT EXISTS `analyse_patients` (
  `analyseId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  UNIQUE KEY `analyseId` (`analyseId`),
  UNIQUE KEY `patientId` (`patientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `convention`
--

DROP TABLE IF EXISTS `convention`;
CREATE TABLE IF NOT EXISTS `convention` (
  `societe` varchar(30) COLLATE utf8_bin NOT NULL,
  `patientId` int(11) NOT NULL,
  `pourcentage` int(3) NOT NULL,
  `type` enum('total','partial') COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`societe`),
  UNIQUE KEY `patient_convention` (`patientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `patientId` int(10) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) COLLATE utf8_bin NOT NULL,
  `prenom` varchar(30) COLLATE utf8_bin NOT NULL,
  `sexe` enum('male','female') COLLATE utf8_bin NOT NULL,
  `dn` date NOT NULL,
  `numero` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`patientId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `grade` enum('sec','com','lab','med') COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `grade`) VALUES
(1, 'kira@oussama.com', 'kiraoussama', 'sec'),
(2, 'com@gmail.com', 'com', 'com');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `analyse_patients`
--
ALTER TABLE `analyse_patients`
  ADD CONSTRAINT `analysefk` FOREIGN KEY (`analyseId`) REFERENCES `analyse` (`analyseId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `patientfk` FOREIGN KEY (`patientId`) REFERENCES `patients` (`patientId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `convention`
--
ALTER TABLE `convention`
  ADD CONSTRAINT `convention_patientfk` FOREIGN KEY (`patientId`) REFERENCES `patients` (`patientId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
