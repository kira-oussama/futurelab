-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  sam. 20 juin 2020 à 17:41
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`patientId`, `societe`, `nom`, `prenom`, `sexe`, `dn`, `numero`) VALUES
(12, 'nsa', 'kira', 'oussama', 'male', '1999-10-29', '0554226805'),
(22, NULL, 'amri', 'oussama', 'male', '1999-10-29', '0554226805');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `convention_patientfk` FOREIGN KEY (`societe`) REFERENCES `conventions` (`societe`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
