/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.0.51b-community-nt : Database - feyacalendar
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`feyacalendar` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `feyacalendar`;

/*Table structure for table `calendar_event` */

DROP TABLE IF EXISTS `calendar_event`;

CREATE TABLE `calendar_event` (
  `id` bigint(20) NOT NULL auto_increment,
  `version` bigint(20) NOT NULL,
  `authorId` bigint(20) NOT NULL,
  `calendarTypeId` bigint(20) NOT NULL,
  `creation_date` datetime NOT NULL,
  `description` longtext,
  `endTime` datetime NOT NULL,
  `locked` bit(1) NOT NULL,
  `repeatType` longtext NOT NULL,
  `startTime` datetime NOT NULL,
  `subject` varchar(255) default NULL,
  `update_date` datetime NOT NULL,
  `userId` bigint(20) default NULL,
  `calendarId` bigint(20) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Table structure for table `calendar_event_reminder` */

DROP TABLE IF EXISTS `calendar_event_reminder`;

CREATE TABLE `calendar_event_reminder` (
  `id` bigint(20) NOT NULL auto_increment,
  `version` bigint(20) NOT NULL,
  `early` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `alerted` varchar(255) default NULL,
  `eventId` bigint(20) NOT NULL,
  `unit` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `calendar_setting` */

DROP TABLE IF EXISTS `calendar_setting`;

CREATE TABLE `calendar_setting` (
  `id` bigint(20) NOT NULL auto_increment,
  `version` bigint(20) NOT NULL,
  `activeEndTime` varchar(255) NOT NULL,
  `activeStartTime` varchar(255) NOT NULL,
  `authorId` bigint(20) NOT NULL,
  `createByDblclick` bit(1) NOT NULL,
  `creationDate` datetime NOT NULL,
  `dayFormat` varchar(255) NOT NULL,
  `fromtoFormat` varchar(255) NOT NULL,
  `hideInactiveRow` bit(1) NOT NULL,
  `hourFormat` varchar(255) NOT NULL,
  `initialView` int(11) NOT NULL,
  `intervalSlot` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `monthFormat` varchar(255) NOT NULL,
  `readOnly` bit(1) NOT NULL,
  `singleDay` bit(1) NOT NULL,
  `startDay` varchar(255) NOT NULL,
  `updateDate` datetime NOT NULL,
  `weekFormat` varchar(255) NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Table structure for table `calendar_share` */

DROP TABLE IF EXISTS `calendar_share`;

CREATE TABLE `calendar_share` (
  `id` bigint(20) NOT NULL auto_increment,
  `version` bigint(20) NOT NULL,
  `calendarTypeId` bigint(20) NOT NULL,
  `creationDate` datetime NOT NULL,
  `ownerId` bigint(20) NOT NULL,
  `permit` varchar(255) default NULL,
  `updateDate` datetime NOT NULL,
  `userId` bigint(20) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `calendar_type` */

DROP TABLE IF EXISTS `calendar_type`;

CREATE TABLE `calendar_type` (
  `id` bigint(20) NOT NULL auto_increment,
  `version` bigint(20) NOT NULL,
  `authorId` bigint(20) NOT NULL,
  `color` varchar(255) NOT NULL,
  `creation_date` datetime NOT NULL,
  `description` longtext,
  `hide` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `update_date` datetime NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL auto_increment,
  `version` bigint(20) NOT NULL,
  `active` varchar(255) NOT NULL,
  `createTime` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `note` longtext,
  `password` varchar(255) NOT NULL,
  `updateTime` datetime NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
