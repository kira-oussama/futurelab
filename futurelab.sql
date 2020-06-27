-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 28, 2020 at 12:12 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `futurelab`
--

-- --------------------------------------------------------

--
-- Table structure for table `analyses`
--

CREATE TABLE `analyses` (
  `analyseId` int(11) NOT NULL,
  `nom` varchar(50) COLLATE utf8_bin NOT NULL,
  `prix` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `analyses`
--

INSERT INTO `analyses` (`analyseId`, `nom`, `prix`) VALUES
(1, 'something', 2000),
(7, 'test', 1800),
(8, 'thing', 5000);

-- --------------------------------------------------------

--
-- Table structure for table `analyses_patients`
--

CREATE TABLE `analyses_patients` (
  `apId` int(11) NOT NULL,
  `analyseId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `colorId` int(5) NOT NULL,
  `payed` tinyint(1) NOT NULL DEFAULT 0,
  `demande_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `validated` tinyint(1) NOT NULL DEFAULT 0,
  `waiting` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `analyses_patients`
--

INSERT INTO `analyses_patients` (`apId`, `analyseId`, `patientId`, `colorId`, `payed`, `demande_date`, `validated`, `waiting`) VALUES
(1, 1, 25, 1, 0, '2020-06-26 15:20:13', 1, 1),
(2, 7, 23, 1, 0, '2020-06-26 15:13:58', 1, 1),
(4, 1, 23, 3, 0, '2020-06-26 15:29:28', 1, 1),
(9, 1, 27, 1, 0, '2020-06-27 22:10:58', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `colorId` int(11) NOT NULL,
  `color` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`colorId`, `color`) VALUES
(1, 'blue'),
(2, 'green'),
(3, 'red'),
(4, 'yellow');

-- --------------------------------------------------------

--
-- Table structure for table `conventions`
--

CREATE TABLE `conventions` (
  `societe` varchar(30) COLLATE utf8_bin NOT NULL,
  `pourcentage` int(3) NOT NULL,
  `type` enum('total','partial') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `conventions`
--

INSERT INTO `conventions` (`societe`, `pourcentage`, `type`) VALUES
('cia', 33, 'partial');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patientId` int(10) NOT NULL,
  `societe` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `nom` varchar(30) COLLATE utf8_bin NOT NULL,
  `prenom` varchar(30) COLLATE utf8_bin NOT NULL,
  `sexe` enum('male','female') COLLATE utf8_bin NOT NULL,
  `dn` date NOT NULL,
  `numero` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patientId`, `societe`, `nom`, `prenom`, `sexe`, `dn`, `numero`) VALUES
(23, 'cia', 'amri', 'abdelkrim', 'male', '1999-10-29', '0554226805'),
(25, NULL, 'hero', 'hamada', 'male', '1999-02-09', '0546484984'),
(27, NULL, 'omar ', 'dine', 'male', '1999-11-25', '0554784456');

-- --------------------------------------------------------

--
-- Table structure for table `resultats`
--

CREATE TABLE `resultats` (
  `resultId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `edition_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `remarque` varchar(250) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `resultats`
--

INSERT INTO `resultats` (`resultId`, `patientId`, `edition_date`, `remarque`) VALUES
(11, 23, '2020-06-26 15:30:20', NULL),
(12, 23, '2020-06-26 15:30:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `typesresultats`
--

CREATE TABLE `typesresultats` (
  `typeId` int(11) NOT NULL,
  `resultId` int(11) NOT NULL,
  `resultname` varchar(100) COLLATE utf8_bin NOT NULL,
  `resultat` float NOT NULL,
  `Unité` varchar(10) COLLATE utf8_bin NOT NULL,
  `normes` varchar(13) COLLATE utf8_bin NOT NULL,
  `Antériorité` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `typesresultats`
--

INSERT INTO `typesresultats` (`typeId`, `resultId`, `resultname`, `resultat`, `Unité`, `normes`, `Antériorité`) VALUES
(10, 11, 'test', 55, '55', '55', '55'),
(11, 12, 'something', 66, '66', '66', '66');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(30) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `grade` enum('sec','com','lab','med') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `grade`) VALUES
(1, 'kira@oussama.com', 'kiraoussama', 'sec'),
(2, 'com@gmail.com', 'com', 'com'),
(3, 'lab@gmail.com', 'lab', 'lab'),
(4, 'med@gmail.com', 'med', 'med');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `analyses`
--
ALTER TABLE `analyses`
  ADD PRIMARY KEY (`analyseId`);

--
-- Indexes for table `analyses_patients`
--
ALTER TABLE `analyses_patients`
  ADD PRIMARY KEY (`apId`),
  ADD KEY `colorId` (`colorId`),
  ADD KEY `analyseId` (`analyseId`) USING BTREE,
  ADD KEY `patientId` (`patientId`) USING BTREE;

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`colorId`),
  ADD UNIQUE KEY `tubecolor` (`color`);

--
-- Indexes for table `conventions`
--
ALTER TABLE `conventions`
  ADD PRIMARY KEY (`societe`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patientId`),
  ADD KEY `convention_patientfk` (`societe`);

--
-- Indexes for table `resultats`
--
ALTER TABLE `resultats`
  ADD PRIMARY KEY (`resultId`),
  ADD KEY `patientId` (`patientId`);

--
-- Indexes for table `typesresultats`
--
ALTER TABLE `typesresultats`
  ADD PRIMARY KEY (`typeId`),
  ADD KEY `resultId` (`resultId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analyses`
--
ALTER TABLE `analyses`
  MODIFY `analyseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `analyses_patients`
--
ALTER TABLE `analyses_patients`
  MODIFY `apId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `colorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patientId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `resultats`
--
ALTER TABLE `resultats`
  MODIFY `resultId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `typesresultats`
--
ALTER TABLE `typesresultats`
  MODIFY `typeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `analyses_patients`
--
ALTER TABLE `analyses_patients`
  ADD CONSTRAINT `analysefk` FOREIGN KEY (`analyseId`) REFERENCES `analyses` (`analyseId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `colorfk` FOREIGN KEY (`colorId`) REFERENCES `colors` (`colorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `patientfk` FOREIGN KEY (`patientId`) REFERENCES `patients` (`patientId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `convention_patientfk` FOREIGN KEY (`societe`) REFERENCES `conventions` (`societe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `resultats`
--
ALTER TABLE `resultats`
  ADD CONSTRAINT `resultats_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patients` (`patientId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `typesresultats`
--
ALTER TABLE `typesresultats`
  ADD CONSTRAINT `typesresultats_ibfk_1` FOREIGN KEY (`resultId`) REFERENCES `resultats` (`resultId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
