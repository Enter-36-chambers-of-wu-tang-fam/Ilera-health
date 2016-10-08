-- ---
-- Table 'Patient_Form'
--
-- ---

-- DROP TABLE IF EXISTS `Patient_Form`;

CREATE TABLE `Patient_Form` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `doctor_notes` VARCHAR(5000) NULL DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
