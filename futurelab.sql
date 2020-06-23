-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  lun. 22 juin 2020 à 22:04
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
-- Structure de la table `analyses`
--

DROP TABLE IF EXISTS `analyses`;
CREATE TABLE IF NOT EXISTS `analyses` (
  `analyseId` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8_bin NOT NULL,
  `prix` float NOT NULL,
  PRIMARY KEY (`analyseId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `analyses`
--

INSERT INTO `analyses` (`analyseId`, `nom`, `prix`) VALUES
(1, 'something', 2000),
(7, 'test', 1800),
(8, 'thing', 5000);

-- --------------------------------------------------------

--
-- Structure de la table `analyses_patients`
--

DROP TABLE IF EXISTS `analyses_patients`;
CREATE TABLE IF NOT EXISTS `analyses_patients` (
  `analyseId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `payed` tinyint(1) NOT NULL DEFAULT '0',
  `demande_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `validated` tinyint(1) NOT NULL DEFAULT '0',
  `waiting` tinyint(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `analyseId` (`analyseId`),
  UNIQUE KEY `patientId` (`patientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `analyses_patients`
--

INSERT INTO `analyses_patients` (`analyseId`, `patientId`, `payed`, `demande_date`, `validated`, `waiting`) VALUES
(1, 22, 0, '2020-06-21 16:53:39', 0, 1),
(8, 23, 0, '2020-06-21 16:53:54', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `conventions`
--

DROP TABLE IF EXISTS `conventions`;
CREATE TABLE IF NOT EXISTS `conventions` (
  `societe` varchar(30) COLLATE utf8_bin NOT NULL,
  `pourcentage` int(3) NOT NULL,
  `type` enum('total','partial') COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`societe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `conventions`
--

INSERT INTO `conventions` (`societe`, `pourcentage`, `type`) VALUES
('cia', 50, 'total');

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `patientId` int(10) NOT NULL AUTO_INCREMENT,
  `societe` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `nom` varchar(30) COLLATE utf8_bin NOT NULL,
  `prenom` varchar(30) COLLATE utf8_bin NOT NULL,
  `sexe` enum('male','female') COLLATE utf8_bin NOT NULL,
  `dn` date NOT NULL,
  `numero` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`patientId`),
  KEY `convention_patientfk` (`societe`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`patientId`, `societe`, `nom`, `prenom`, `sexe`, `dn`, `numero`) VALUES
(22, NULL, 'amri', 'oussama', 'male', '1999-10-29', '0554226805'),
(23, NULL, 'amri', 'abdelkrim', 'male', '1999-10-29', '0554226805');

-- --------------------------------------------------------

--
-- Structure de la table `resultats`
--

DROP TABLE IF EXISTS `resultats`;
CREATE TABLE IF NOT EXISTS `resultats` (
  `resultId` int(11) NOT NULL AUTO_INCREMENT,
  `patientId` int(11) NOT NULL,
  `edition_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remarque` varchar(250) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`resultId`),
  KEY `patientId` (`patientId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `resultats`
--

INSERT INTO `resultats` (`resultId`, `patientId`, `edition_date`, `remarque`) VALUES
(5, 22, '2020-06-21 16:29:53', 'oh sorry you are going to die'),
(6, 22, '2020-06-21 17:30:43', NULL),
(7, 22, '2020-06-21 17:30:53', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `typesresultats`
--

DROP TABLE IF EXISTS `typesresultats`;
CREATE TABLE IF NOT EXISTS `typesresultats` (
  `typeId` int(11) NOT NULL AUTO_INCREMENT,
  `resultId` int(11) NOT NULL,
  `resultname` varchar(100) COLLATE utf8_bin NOT NULL,
  `resultat` float NOT NULL,
  `Unité` varchar(10) COLLATE utf8_bin NOT NULL,
  `normes` varchar(13) COLLATE utf8_bin NOT NULL,
  `Antériorité` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`typeId`),
  KEY `resultId` (`resultId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `typesresultats`
--

INSERT INTO `typesresultats` (`typeId`, `resultId`, `resultname`, `resultat`, `Unité`, `normes`, `Antériorité`) VALUES
(4, 5, 'kech type okher', 77, 'kg/l', '55 - 80', 'kech 7aja'),
(5, 6, '1', 11, 'df', 'dfd', 'dd'),
(6, 7, '2', 77, 'dfk', 'fdd', 'dfk');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `grade`) VALUES
(1, 'kira@oussama.com', 'kiraoussama', 'sec'),
(2, 'com@gmail.com', 'com', 'com'),
(3, 'lab@gmail.com', 'lab', 'lab'),
(4, 'med@gmail.com', 'med', 'med');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `analyses_patients`
--
ALTER TABLE `analyses_patients`
  ADD CONSTRAINT `analysefk` FOREIGN KEY (`analyseId`) REFERENCES `analyses` (`analyseId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `patientfk` FOREIGN KEY (`patientId`) REFERENCES `patients` (`patientId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `convention_patientfk` FOREIGN KEY (`societe`) REFERENCES `conventions` (`societe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `resultats`
--
ALTER TABLE `resultats`
  ADD CONSTRAINT `resultats_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patients` (`patientId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `typesresultats`
--
ALTER TABLE `typesresultats`
  ADD CONSTRAINT `typesresultats_ibfk_1` FOREIGN KEY (`resultId`) REFERENCES `resultats` (`resultId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
