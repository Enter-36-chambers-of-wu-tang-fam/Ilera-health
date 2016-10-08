-- ---
-- Table 'patient_medication'
-- the mediacation inforrmation of each patient is stored
-- ---

-- DROP TABLE IF EXISTS `patient_medication`;

CREATE TABLE `patient_medication` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `drug_name` VARCHAR(100) NULL DEFAULT NULL,
  `dosage` VARCHAR(100) NULL DEFAULT NULL,
  `id_medication` INTEGER DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `type` VARCHAR(40) NULL,
  PRIMARY KEY (`id`)
);
