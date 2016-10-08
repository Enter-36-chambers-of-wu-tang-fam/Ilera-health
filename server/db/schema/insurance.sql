--
-- Table structure for table `insurance`
--

-- DROP TABLE IF EXISTS `insurance`;

CREATE TABLE `insurance` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `insurer` VARCHAR(255) NULL,
  `type` VARCHAR(255) NULL,
  `network` VARCHAR(255) NULL,
  `uid` VARCHAR(255) NULL,
  PRIMARY KEY (`id`)
);
