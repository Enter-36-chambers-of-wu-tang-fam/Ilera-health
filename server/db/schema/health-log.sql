-- ---
-- Table 'health_log'
-- this is a way for the doctor to assign a health/workout regimen
-- --- and for the patient to log their health as they follow the regimen

-- DROP TABLE IF EXISTS `health_log`;

CREATE TABLE `health_log` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `physician_date` DATE NULL DEFAULT NULL,
  `physician_notes` VARCHAR(10000) NULL DEFAULT NULL,
  `physician_photo_path` VARCHAR(300) NULL,
  `patient_date` DATE NULL DEFAULT NULL,
  `patient_note` VARCHAR(10000) NULL DEFAULT NULL,
  `patient_photo_path` VARCHAR(300) NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
