-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: mysql015.phy.heteml.lan
-- Generation Time: 2020 年 11 月 30 日 12:02
-- サーバのバージョン： 5.6.23-log
-- PHP Version: 5.5.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `_twg_app`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `applications`
--

CREATE TABLE IF NOT EXISTS `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` varchar(128) NOT NULL,
  `redirect_url` varchar(128) NOT NULL,
  `regist_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- テーブルの構造 `approvals`
--

CREATE TABLE IF NOT EXISTS `approvals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `applicate_code` varchar(128) NOT NULL,
  `access_token` varchar(128) NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` varchar(128) NOT NULL,
  `get_culum` varchar(128) NOT NULL COMMENT 'ユーザ情報を取得する際に取得データのカラムを指定する。カンマ区切りで保持',
  `possible_time` datetime NOT NULL COMMENT '連携許可時間 登録時間+半年',
  `token_time` datetime NOT NULL COMMENT 'アクセストークン要求時間+5分',
  `regist_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `applicate_code` (`applicate_code`,`access_token`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
