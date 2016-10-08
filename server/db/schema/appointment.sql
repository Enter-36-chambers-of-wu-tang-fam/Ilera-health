-- ---
-- Table 'appointment'
--
-- ---

-- DROP TABLE IF EXISTS `appointment`;

CREATE TABLE `appointment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `date` DATE NULL DEFAULT NULL,
  `time` TIME NULL DEFAULT NULL,
  `notes` VARCHAR(10000) NULL DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  `id_institution` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
