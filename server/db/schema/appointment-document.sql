-- ---
-- Table 'appointment_document'
-- this is for the seperate documents that may be required for patients to fill out before each visit
-- ---

-- DROP TABLE IF EXISTS `appointment_document`;

CREATE TABLE `appointment_document` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `document` BLOB(400) NULL DEFAULT NULL,
  `id_appointment` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
