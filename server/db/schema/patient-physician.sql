-- ---
-- Table 'patient_physician'
--
-- ---

-- DROP TABLE IF EXISTS `patient_physician`;

CREATE TABLE `patient_physician` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `betterDoctorUID` VARCHAR(100) DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
