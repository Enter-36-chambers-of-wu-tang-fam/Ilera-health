-- ---
-- Table 'institution'
--
-- ---

-- DROP TABLE IF EXISTS `institution`;

CREATE TABLE `institution` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `inst_name` VARCHAR(30) NULL DEFAULT NULL,
  `type` VARCHAR(25) NULL DEFAULT NULL,
  `description` VARCHAR(300) NULL DEFAULT NULL,
  `rating` INTEGER(5) NULL DEFAULT NULL,
  `phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `address` VARCHAR(300) NULL,
  `city` VARCHAR(50) NULL,
  `state` VARCHAR(3) NULL,
  `zip` VARCHAR(10) NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
);
