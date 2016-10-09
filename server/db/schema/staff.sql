-- ---
-- Table 'staff'
--
-- ---

-- DROP TABLE IF EXISTS `staff`;

CREATE TABLE `staff` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(50) NULL,
  `last` VARCHAR(50) NULL,
  `email` VARCHAR(100) NULL,
  `phone_number` VARCHAR(25) NULL,
  `password` VARCHAR(200) NULL,
  `photo_path` VARCHAR(300) NULL,
  `address` VARCHAR(1000) NULL,
  `city` VARCHAR(1000) NULL,
  `state` VARCHAR(10) NULL,
  `zip` VARCHAR(10) NULL,
  `birth_country` VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
);
