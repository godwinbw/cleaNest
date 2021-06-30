-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: cleanest_db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Kitchen','2021-06-30 02:55:59','2021-06-30 02:55:59'),(2,'Bedroom','2021-06-30 02:55:59','2021-06-30 02:55:59'),(3,'Living Room','2021-06-30 02:55:59','2021-06-30 02:55:59'),(4,'Lisa Bedroom','2021-06-30 02:55:59','2021-06-30 02:55:59'),(5,'Bart Bedroom','2021-06-30 02:55:59','2021-06-30 02:55:59'),(6,'Kids Bathroom','2021-06-30 02:55:59','2021-06-30 02:55:59'),(7,'Bathroom','2021-06-30 02:55:59','2021-06-30 02:55:59');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chore`
--

DROP TABLE IF EXISTS `chore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chore` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  `is_recurring` tinyint(1) DEFAULT NULL,
  `recurring_pattern_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `recurring_pattern_id` (`recurring_pattern_id`),
  CONSTRAINT `chore_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `chore_ibfk_2` FOREIGN KEY (`recurring_pattern_id`) REFERENCES `recurring_pattern` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chore`
--

LOCK TABLES `chore` WRITE;
/*!40000 ALTER TABLE `chore` DISABLE KEYS */;
INSERT INTO `chore` VALUES (1,'Wash the Dishes',1,1,1,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(2,'Take out Trash',1,1,1,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(3,'Mop the Floor',1,1,8,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(4,'Change bed sheets',4,1,8,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(5,'Change bed sheets',5,1,8,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(6,'Change bed sheets',2,1,8,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(7,'Clean Bathroom',6,1,6,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(8,'Clean Bathroom',7,1,6,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(9,'Vacuum Carpet',2,1,5,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(10,'Vacuum Carpet',3,1,5,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(11,'Vacuum Carpet',4,1,5,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(12,'Vacuum Carpet',5,1,5,'2021-06-30 02:55:59','2021-06-30 02:55:59');
/*!40000 ALTER TABLE `chore` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recurring_pattern`
--

DROP TABLE IF EXISTS `recurring_pattern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recurring_pattern` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_daily` tinyint(1) DEFAULT NULL,
  `is_weekly` tinyint(1) DEFAULT NULL,
  `is_monthly` tinyint(1) DEFAULT NULL,
  `day_of_week` int DEFAULT NULL,
  `week_of_month` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recurring_pattern`
--

LOCK TABLES `recurring_pattern` WRITE;
/*!40000 ALTER TABLE `recurring_pattern` DISABLE KEYS */;
INSERT INTO `recurring_pattern` VALUES (1,'Daily',1,0,0,NULL,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(2,'Weekly Sunday',0,1,0,0,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(3,'Weekly Monday',0,1,0,1,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(4,'Weekly Tuesday',0,1,0,2,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(5,'Weekly Wednesday',0,1,0,3,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(6,'Weekly Thursday',0,1,0,4,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(7,'Weekly Friday',0,1,0,5,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(8,'Weekly Saturday',0,1,0,6,NULL,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(9,'Monthly - 1st week Monday',0,0,1,1,1,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(10,'Monthly - 2nd week Wednesday',0,0,1,3,2,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(11,'Monthly - 4th week Friday',0,0,1,5,4,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(12,'Monthly - 1st week Friday',0,0,1,5,1,'2021-06-30 02:55:59','2021-06-30 02:55:59');
/*!40000 ALTER TABLE `recurring_pattern` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chore_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `due_date` varchar(255) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chore_id` (`chore_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`chore_id`) REFERENCES `chore` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,4,4,'2021-07-03',0,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(2,5,3,'2021-07-03',0,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(3,6,1,'2021-07-03',0,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(4,10,3,'2021-06-30',0,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(5,11,4,'2021-06-30',0,'2021-06-30 02:55:59','2021-06-30 02:55:59'),(6,1,NULL,'2021-06-30',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(7,1,NULL,'2021-07-01',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(8,1,NULL,'2021-07-06',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(9,1,NULL,'2021-07-03',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(10,1,NULL,'2021-07-02',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(11,1,NULL,'2021-07-04',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(12,1,NULL,'2021-07-05',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(13,2,NULL,'2021-06-30',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(14,2,NULL,'2021-07-01',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(15,2,NULL,'2021-07-02',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(16,2,NULL,'2021-07-03',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(17,2,NULL,'2021-07-04',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(18,2,NULL,'2021-07-05',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(19,2,NULL,'2021-07-06',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(20,9,NULL,'2021-07-01',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(21,11,NULL,'2021-07-01',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(22,12,NULL,'2021-07-01',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(23,7,NULL,'2021-07-02',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(24,8,NULL,'2021-07-02',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(25,10,NULL,'2021-07-01',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(26,3,NULL,'2021-07-04',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(27,4,NULL,'2021-07-04',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(28,5,NULL,'2021-07-04',0,'2021-06-30 02:56:21','2021-06-30 02:56:21'),(29,6,NULL,'2021-07-04',0,'2021-06-30 02:56:21','2021-06-30 02:56:21');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `display_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Bart Simpson','bart','$2b$10$2bHRzshSu8J64AfFkYR9Nu.ujDtaiN203/PULpMYoikYnbpHA77AO'),(2,'Lisa Simpson','lisa','$2b$10$DRYMWuZ8vMzt9O3P0m8..uESp1Uwad6ywewUNlS/zxMPWLKGBvQk6'),(3,'Homer Simpson','homer','$2b$10$zqJpmdPhF4c70lF.w4aI5O964.0Vi9kjioukI5ghElNDV0QTyfkL.'),(4,'Marge Simpson','marge','$2b$10$8fwTmyNrOSu1ZWiD.g8YieZdA4nb6U/LOxT7SwsrkYb4QkjMeo6A.');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-29 21:57:06
