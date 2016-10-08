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
  PRIMARY KEY (`id`)
);
