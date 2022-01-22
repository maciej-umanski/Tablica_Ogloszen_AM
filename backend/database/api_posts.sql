-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: api
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user` (`author_id`),
  CONSTRAINT `user` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (11,'2021-11-28 11:00:00','Sprzedam samochód, 30000zł, do negocjacji','Samochód','samochod.jpg',1),
                           (12,'2021-10-13 12:00:00','Za darmo do oddania wiertarka.','Wiertarka','wiertarka.jpg',2),
                           (13,'2022-01-01 13:39:00','Sprzedam super komputer, jedynie 3000zł!!!!!! Okazja','Komputer','komputer.jpg',4),
                           (14,'2022-01-14 15:25:00','KUPIĘ!!! koniecznie nowe','Zestaw sztućców','sztucce.jpg',1),
                           (15,'2021-01-10 18:00:00','Oddam za awokado, stan nieznany.','Monitor','monitor.jpg',2),
                           (16,'2021-01-13 13:00:00','Szukam telefonu dla córki, chciała by dotykowy. Oferuje 500zł','Telefon','telefon.jpg',2),
                           (17,'2021-01-12 21:00:00','Sprzedam ładowarkę do tabletu, 15zł','Ładowarka','ladowarka.jpg',1),
                           (18,'2022-01-14 22:00:00','KOLEKCJONERSKIE!!! JEDYNE TAKIE!!! 300000zł!!!!!!!!!','Karty do gry','karty.jpg',4),
                           (19,'2022-01-15 23:00:00','Oferuje stworzenie plakatu na podstawie zdjęcia! 30zł sztuka!','Plakat','plakat.jpg',4);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-29 21:05:51
