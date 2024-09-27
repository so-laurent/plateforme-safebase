-- MySQL dump 10.13  Distrib 8.0.35, for macos12.7 (arm64)
--
-- Host: localhost    Database: safebase
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  `db_name` varchar(255) NOT NULL,
  `db_type` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
INSERT INTO `actions` VALUES (1,'restore','','','2024-09-25 11:57:49'),(2,'save','test','mysql','2024-09-25 12:00:39'),(3,'save','test2','mysql','2024-09-25 12:04:28'),(4,'save','test2554545','mysql','2024-09-25 12:10:02'),(5,'save','test2','mysql','2024-09-25 12:25:16'),(6,'save','test2frrfref','mysql','2024-09-25 12:26:11'),(7,'save','test','mysql','2024-09-25 12:28:09'),(8,'save','testfffdsfs','mysql','2024-09-25 12:29:03'),(9,'save','test','mysql','2024-09-25 12:32:13'),(10,'restore','test2','mysql','2024-09-25 12:39:24'),(11,'restore','teest3','mysql','2024-09-25 12:42:36'),(12,'sauvegarde','safebase','mysql','2024-09-26 10:44:13'),(13,'sauvegarde','test','mysql','2024-09-26 10:45:40');
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `all_databases`
--

DROP TABLE IF EXISTS `all_databases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_databases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `host` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `db_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `db_type` varchar(25) NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_databases`
--

LOCK TABLES `all_databases` WRITE;
/*!40000 ALTER TABLE `all_databases` DISABLE KEYS */;
INSERT INTO `all_databases` VALUES (1,'localhost','root','root','silver-micro','2024-09-25 09:06:20','mysql',0),(2,'localhost','root','root','test','2024-09-25 09:15:22','mysql',0),(3,'localhost','root','root','test2','2024-09-25 11:41:54','mysql',0),(4,'localhfdhef','dsqsqd','dfdsfds','dsqsqdqsdqs','2024-09-25 12:57:42','mysql',0),(5,'localhost','root','root','test','2024-09-26 09:53:14','mysql',0),(6,'localhost','root','root','test','2024-09-26 10:27:38','mysql',0),(7,'localhost','root','root','safebase','2024-09-26 12:32:12','mysql',1),(8,'localhost','root','root','safebase','2024-09-26 12:40:25','mysql',1),(9,'localhost','root','root','safebase','2024-09-26 12:59:18','mysql',1);
/*!40000 ALTER TABLE `all_databases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backups`
--

DROP TABLE IF EXISTS `backups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(1000) NOT NULL,
  `db_name` varchar(255) NOT NULL,
  `db_type` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backups`
--

LOCK TABLES `backups` WRITE;
/*!40000 ALTER TABLE `backups` DISABLE KEYS */;
INSERT INTO `backups` VALUES (12,'test_backup_2024-09-26_12-45-40.sql','test','mysql','2024-09-26 10:45:40');
/*!40000 ALTER TABLE `backups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cron`
--

DROP TABLE IF EXISTS `cron`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron` (
  `id` int NOT NULL AUTO_INCREMENT,
  `db_name` varchar(255) NOT NULL,
  `host` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `frequency` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `db_type` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` varchar(25) NOT NULL,
  `pattern` varchar(25) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cron`
--

LOCK TABLES `cron` WRITE;
/*!40000 ALTER TABLE `cron` DISABLE KEYS */;
INSERT INTO `cron` VALUES (1,'safebase','localhost','root','hourly','mysql','active','* * * * *','2024-09-25 13:32:00'),(2,'safebase','localhost','root','hourly','mysql','active','* * * * *','2024-09-25 13:33:00'),(3,'safebase','localhost','root','hourly','mysql','active','* * * * *','2024-09-25 13:34:00'),(4,'safebase','localhost','root','hourly','mysql','active','* * * * *','2024-09-25 13:35:00'),(5,'safebase','localhost','root','hourly','mysql','active','* * * * *','2024-09-25 13:36:00'),(6,'safebase','localhost','root','hourly','mysql','active','* * * * *','2024-09-25 13:37:00');
/*!40000 ALTER TABLE `cron` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-26 15:10:15
