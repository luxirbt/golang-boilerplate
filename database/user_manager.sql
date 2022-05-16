-- Adminer 4.8.0 MySQL 5.5.5-10.5.9-MariaDB-1:10.5.9+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `application`;
CREATE TABLE `application` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `appname` char(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`,`appname`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` bigint(20) unsigned NOT NULL,
  `id_app` bigint(20) unsigned NOT NULL,
  `id_role` bigint(20) unsigned NOT NULL,
  `roleListe` varchar(100) NOT NULL COMMENT 'ex : 1,2,3....,n ',
  PRIMARY KEY (`id`,`id_user`,`id_app`) USING BTREE,
  KEY `fk_user` (`id_user`),
  KEY `fk_app` (`id_app`),
  KEY `fk_role` (`id_role`),
  CONSTRAINT `fk_app` FOREIGN KEY (`id_app`) REFERENCES `application` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `denomination` char(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`,`denomination`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `password` varbinary(500) NOT NULL,
  `is_active` bigint(20) NOT NULL DEFAULT 0,
  `firstname` char(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `lastname` char(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `email` char(50) CHARACTER SET latin1 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`,`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2021-10-11 12:50:22
