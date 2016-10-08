-- ---
-- Table 'emergency_contact'
--
-- ---

-- DROP TABLE IF EXISTS `emergency_contact`;

CREATE TABLE `emergency_contact` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `e_1_contact_first` VARCHAR(30) NULL DEFAULT NULL,
  `e_1_contact_last` VARCHAR(30) NULL DEFAULT NULL,
  `e_1_contact_phone` VARCHAR(20) NULL DEFAULT NULL,
  `e_1_contact_email` VARCHAR(30) NULL DEFAULT NULL,
  `e_1_contact_relationship` VARCHAR(30) NULL DEFAULT NULL,
  `e_2_contact_first` VARCHAR(30) NULL DEFAULT NULL,
  `e_2_contact_last` VARCHAR(30) NULL DEFAULT NULL,
  `e_2_contact_phone` VARCHAR(20) NULL DEFAULT NULL,
  `e_2_contact_email` VARCHAR(30) NULL DEFAULT NULL,
  `e_2_contact_relationship` VARCHAR(30) NULL DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
