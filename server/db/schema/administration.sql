-- ---
-- Table 'administration'
--
-- ---

-- DROP TABLE IF EXISTS `administration`;

CREATE TABLE `administration` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(25) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
