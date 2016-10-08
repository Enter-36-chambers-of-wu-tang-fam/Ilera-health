-- ---
-- Table 'physician'
--
-- ---

-- DROP TABLE IF EXISTS `physician`;

CREATE TABLE `physician` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `betterDoctorUID` VARCHAR(100) NULL,
  `first` VARCHAR(30) NULL,
  `last` VARCHAR(30) NULL,
  `email` VARCHAR(30) NULL,
  `phone_number` VARCHAR(20) NULL,
  `password` VARCHAR(300) NULL,
  `photo_path` VARCHAR(300) NULL,
  `specialty` VARCHAR(500) NULL,
  PRIMARY KEY (`id`)
);
