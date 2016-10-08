-- ---
-- Table 'medication'
--
-- ---

-- DROP TABLE IF EXISTS `medication`;

CREATE TABLE `medication` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `drug_name` VARCHAR(100) NULL DEFAULT NULL,
  `details` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
