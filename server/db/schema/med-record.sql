-- ---
-- Table 'med_records'
--
-- ---

-- DROP TABLE IF EXISTS `med_records`;

CREATE TABLE `med_records` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `type` VARCHAR(400) NULL,
  `document_path` VARCHAR(500) NULL,
  `description` VARCHAR(1000) NULL,
  `id_patient` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);
