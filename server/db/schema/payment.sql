-- ---
-- Table 'payment'
-- this is to store the bill of each visit the patient makes to the doctor
-- ---

-- DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `copay` INTEGER NULL DEFAULT NULL,
  `bill` INTEGER NULL DEFAULT NULL,
  `bill_statement` VARCHAR(300) NULL,
  `due_date` DATE DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
