-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 27, 2020 at 12:05 AM
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
(14, 'adn', 3000),
(19, 'tsh', 2000),
(20, 'irm', 2000),
(21, 'fns', 4000),
(22, 'groupage', 400);

-- --------------------------------------------------------

--
-- Table structure for table `analyses_patients`
--

CREATE TABLE `analyses_patients` (
  `apId` int(11) NOT NULL,
  `analyseId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `colorId` int(5) DEFAULT NULL,
  `payed` tinyint(1) NOT NULL DEFAULT 0,
  `demande_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `validated` tinyint(1) NOT NULL DEFAULT 0,
  `waiting` tinyint(1) NOT NULL DEFAULT 0,
  `imprimer` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `analyses_patients`
--

INSERT INTO `analyses_patients` (`apId`, `analyseId`, `patientId`, `colorId`, `payed`, `demande_date`, `validated`, `waiting`, `imprimer`) VALUES
(1, 14, 48, NULL, 0, '2020-08-26 14:40:16', 0, 0, 0),
(2, 19, 48, NULL, 0, '2020-08-26 14:40:21', 0, 0, 1),
(3, 20, 48, NULL, 0, '2020-08-26 14:40:26', 0, 0, 1),
(4, 21, 48, NULL, 0, '2020-08-26 14:40:31', 0, 0, 1),
(5, 22, 49, NULL, 0, '2020-08-26 14:40:42', 0, 0, 0),
(6, 20, 49, NULL, 0, '2020-08-26 14:40:47', 0, 0, 0),
(7, 20, 50, NULL, 0, '2020-08-26 14:41:04', 0, 0, 0),
(8, 22, 50, NULL, 0, '2020-08-26 14:41:08', 0, 0, 0),
(9, 19, 46, NULL, 0, '2020-08-26 15:06:59', 0, 1, 1),
(10, 14, 47, NULL, 0, '2020-08-26 15:07:05', 0, 1, 1);

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
(8, 'gris'),
(6, 'jaune'),
(3, 'red'),
(9, 'rose'),
(7, 'violet');

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
('opji', 20, 'total'),
('tls', 22, 'total');

-- --------------------------------------------------------

--
-- Table structure for table `entente`
--

CREATE TABLE `entente` (
  `code` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nom` varchar(30) NOT NULL,
  `address` varchar(30) NOT NULL,
  `telephone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `entente`
--

INSERT INTO `entente` (`code`, `nom`, `address`, `telephone`) VALUES
('1001', 'sidi mabrouk', 'sidi mabrouk constantine 123', '0540037444'),
('1002', 'bosouf', 'bosouf constantine 4994', '0560048905'),
('1003', 'hamma bouziyan', 'hamma bouziyan centre 109', '0540037061');

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
  `numero` varchar(10) COLLATE utf8_bin NOT NULL,
  `codeEntent` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patientId`, `societe`, `nom`, `prenom`, `sexe`, `dn`, `numero`, `codeEntent`) VALUES
(45, NULL, 'elouafi', 'nesrine', 'female', '2000-03-01', '0540392872', '1002'),
(46, NULL, 'amri ', 'abdelkrim', 'male', '1999-10-29', '0554226805', '1003'),
(47, NULL, 'cheikh boukal', 'ouail nazim', 'male', '2000-01-15', '0540037061', '1003'),
(48, NULL, 'lamaara', 'razzan', 'female', '2000-03-15', '0568383833', '1001'),
(49, NULL, 'rekab ', 'abir', 'female', '2000-02-05', '0784444444', '1001'),
(50, NULL, 'khengi', 'nour', 'female', '1998-06-22', '0882822222', '1001'),
(51, NULL, 'boulsina ', 'baha edinne', 'male', '1999-12-06', '0399999999', '1002');

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

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(30) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `grade` enum('sec','com','lab','med','chef','perv') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `password`, `grade`) VALUES
(1, 'kira@gmail.com', 'kira', 'sec'),
(2, 'com@gmail.com', 'com', 'com'),
(3, 'lab@gmail.com', 'lab', 'lab'),
(4, 'med@gmail.com', 'med', 'med'),
(5, 'chef@mail.com', 'chef', 'chef'),
(13, 'pr@gmail.com', 'pr', 'perv');

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
-- Indexes for table `entente`
--
ALTER TABLE `entente`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patientId`),
  ADD KEY `convention_patientfk` (`societe`),
  ADD KEY `codeEntent` (`codeEntent`);

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
  MODIFY `analyseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `analyses_patients`
--
ALTER TABLE `analyses_patients`
  MODIFY `apId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `colorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patientId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `resultats`
--
ALTER TABLE `resultats`
  MODIFY `resultId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `typesresultats`
--
ALTER TABLE `typesresultats`
  MODIFY `typeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  ADD CONSTRAINT `convention_patientfk` FOREIGN KEY (`societe`) REFERENCES `conventions` (`societe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `entante_patient` FOREIGN KEY (`codeEntent`) REFERENCES `entente` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

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
