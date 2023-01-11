-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Jan 11. 13:02
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `2123szft_socialmediaportal`
--
CREATE DATABASE IF NOT EXISTS `2123szft_socialmediaportal` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `2123szft_socialmediaportal`;

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `commentdetails`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `commentdetails` (
`ID` int(11)
,`postID` int(11)
,`name` varchar(100)
,`filename` varchar(255)
,`date` datetime
,`comment` text
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `comment` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`ID`, `userID`, `postID`, `date`, `comment`) VALUES
(1, 3, 1, '2022-12-13 09:59:57', 'Ésszel játszadozzál mert lehet hogy megesz egy impostor sussy'),
(2, 1, 1, '2022-12-19 10:53:53', 'Itt a fonok en vagyok te csak crewmate vagy'),
(4, 3, 1, '2022-12-19 11:21:23', 'jolesz'),
(6, 3, 1, '2023-01-09 09:58:00', 'He?'),
(7, 3, 1, '2023-01-09 10:06:00', 'Na igen'),
(8, 3, 1, '2023-01-09 10:07:00', 'aha'),
(9, 3, 2, '2023-01-09 10:07:00', 'na ez itt az első'),
(10, 3, 1, '2023-01-09 10:17:00', '7. valami'),
(11, 3, 1, '2023-01-09 10:23:00', '8.?'),
(12, 3, 1, '2023-01-09 10:23:00', '9.?'),
(13, 3, 1, '2023-01-09 10:24:00', '10.?'),
(14, 3, 1, '2023-01-09 10:55:00', '11?'),
(15, 3, 1, '2023-01-09 10:56:00', '11?'),
(17, 3, 1, '2023-01-09 11:09:00', 'uj'),
(21, 3, 4, '2023-01-09 11:54:00', 'bgtes');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `emotions`
--

CREATE TABLE `emotions` (
  `ID` int(11) NOT NULL,
  `class` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `color` varchar(40) COLLATE utf8_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `emotions`
--

INSERT INTO `emotions` (`ID`, `class`, `name`, `color`) VALUES
(1, 'bi bi-hand-thumbs-up', 'Kedvel', 'primary'),
(2, 'bi bi-hand-thumbs-down', 'Nem kedvel', 'danger'),
(3, 'bi bi-heart', 'Szeret', 'danger'),
(4, 'bi bi-heartbreak', 'Nem szeret', 'danger'),
(5, 'bi bi-emoji-kiss', 'Csókol', 'danger'),
(6, 'bi bi-emoji-heart-eyes', 'Örül', 'warning'),
(7, 'bi bi-emoji-angry', 'Mérges', 'danger'),
(8, 'bi bi-emoji-frown', 'Szomorú', 'warning'),
(9, 'bi bi-emoji-laughing', 'Nevet', 'warning'),
(10, 'bi bi-emoji-smile', 'Mosolyog', 'warning'),
(11, 'bi bi-emoji-sunglasses', 'Vagány', 'warning'),
(12, 'bi bi-emoji-wink', 'Kacsint', 'warning'),
(13, 'bi bi-emoji-neutral', 'Semleges', 'warning');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `messages`
--

CREATE TABLE `messages` (
  `ID` int(11) NOT NULL,
  `fromID` int(11) NOT NULL,
  `toID` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `message` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `messages`
--

INSERT INTO `messages` (`ID`, `fromID`, `toID`, `date`, `message`) VALUES
(18, 3, 1, '2023-01-11 12:03:01', 'admintól első amógának 1.'),
(19, 3, 2, '2023-01-11 12:03:23', 'admintól a második muskétásnak 1.'),
(20, 2, 3, '2023-01-11 12:05:23', 'második muskétástól az adminnak 1.'),
(21, 2, 1, '2023-01-11 12:25:16', 'második muskétástól az első amógának 1.'),
(22, 1, 2, '2023-01-11 12:26:59', 'első amógától a második muskétásnak 1.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pictures`
--

CREATE TABLE `pictures` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `filename` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `pictures`
--

INSERT INTO `pictures` (`ID`, `userID`, `filename`) VALUES
(4, 3, 'adminka.jpg\r\n'),
(5, 1, 'amogus.jpg'),
(6, 2, 'musketer.jpg');

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `postdetails`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `postdetails` (
`ID` int(11)
,`userID` int(11)
,`name` varchar(100)
,`date` datetime
,`postmessage` text
,`filename` varchar(255)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `posts`
--

CREATE TABLE `posts` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `postmessage` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `posts`
--

INSERT INTO `posts` (`ID`, `userID`, `date`, `postmessage`) VALUES
(1, 1, '2022-12-13 09:58:18', 'Eléggé sus ez a veboldal'),
(2, 2, '2022-12-19 10:52:43', 'Na heloka elso posztom itten'),
(4, 1, '2022-12-19 11:24:18', 'Annyit postolok amennyit akarok hgehe');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reactions`
--

CREATE TABLE `reactions` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `postID` int(11) NOT NULL,
  `emojiID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `reactions`
--

INSERT INTO `reactions` (`ID`, `userID`, `postID`, `emojiID`) VALUES
(1, 1, 1, 6),
(4, 3, 2, 7),
(5, 3, 1, 6);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `phone` varchar(30) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `filename` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL COMMENT 'profilkép',
  `reg` datetime NOT NULL DEFAULT current_timestamp(),
  `last` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `name`, `email`, `password`, `phone`, `address`, `filename`, `reg`, `last`, `status`) VALUES
(1, 'Első Amóga', 'amoga@amog.us', 'cd9042e8a990b08cd4acaeae3089c156ca2615fc', 'amogamogtelefon', 'amoga utca amoga', 'amogus.jpg', '2022-12-12 11:34:16', NULL, 1),
(2, 'Masodik muskétás', 'musk@tesla.com', '717c14b3118b0299c89c2cbedc02646e018ce96c', 'amogatelefon', 'amoga utca0', 'musketer.jpg', '2022-12-13 09:57:02', '2023-01-11 12:04:49', 1),
(3, 'admin', 'admin@admin.com', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', 'adminfone', 'adminokhelye', 'adminka.jpg', '2022-12-13 09:57:45', '2023-01-11 12:05:45', 1);

-- --------------------------------------------------------

--
-- Nézet szerkezete `commentdetails`
--
DROP TABLE IF EXISTS `commentdetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `commentdetails`  AS  select `comments`.`ID` AS `ID`,`posts`.`ID` AS `postID`,`users`.`name` AS `name`,`pictures`.`filename` AS `filename`,`comments`.`date` AS `date`,`comments`.`comment` AS `comment` from (((`comments` join `posts` on(`posts`.`ID` = `comments`.`postID`)) join `users` on(`users`.`ID` = `comments`.`userID`)) join `pictures` on(`pictures`.`userID` = `users`.`ID`)) order by `comments`.`date` desc ;

-- --------------------------------------------------------

--
-- Nézet szerkezete `postdetails`
--
DROP TABLE IF EXISTS `postdetails`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `postdetails`  AS  select `posts`.`ID` AS `ID`,`users`.`ID` AS `userID`,`users`.`name` AS `name`,`posts`.`date` AS `date`,`posts`.`postmessage` AS `postmessage`,`pictures`.`filename` AS `filename` from ((`posts` join `users` on(`users`.`ID` = `posts`.`userID`)) join `pictures` on(`users`.`ID` = `pictures`.`userID`)) order by `posts`.`date` desc ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `postID` (`postID`);

--
-- A tábla indexei `emotions`
--
ALTER TABLE `emotions`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fromID` (`fromID`),
  ADD KEY `toID` (`toID`);

--
-- A tábla indexei `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `postID` (`postID`),
  ADD KEY `emojiID` (`emojiID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `emotions`
--
ALTER TABLE `emotions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `messages`
--
ALTER TABLE `messages`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `pictures`
--
ALTER TABLE `pictures`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `posts`
--
ALTER TABLE `posts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `reactions`
--
ALTER TABLE `reactions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`postID`) REFERENCES `posts` (`ID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fromID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`toID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Megkötések a táblához `reactions`
--
ALTER TABLE `reactions`
  ADD CONSTRAINT `reactions_ibfk_1` FOREIGN KEY (`emojiID`) REFERENCES `emotions` (`ID`),
  ADD CONSTRAINT `reactions_ibfk_3` FOREIGN KEY (`postID`) REFERENCES `posts` (`ID`),
  ADD CONSTRAINT `reactions_ibfk_4` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
