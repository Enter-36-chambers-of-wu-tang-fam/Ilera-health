-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'patient'
--
-- ---

DROP TABLE IF EXISTS `patient`;

CREATE TABLE `patient` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `first` VARCHAR NOT NULL,
  `last` VARCHAR NOT NULL,
  `email` VARCHAR NOT NULL,
  `password` VARCHAR NOT NULL,
  `pin` INTEGER(4) NULL DEFAULT NULL,
  `data_of_birth` DATE NULL,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR NULL,
  `state` VARCHAR(2) NULL,
  `zip` INTEGER NULL,
  `phone_number` INTEGER NULL,
  `weight` INTEGER NULL,
  `height` INTEGER NULL,
  `blood_type` VARCHAR NULL,
  `id_insurance` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'physician'
--
-- ---

DROP TABLE IF EXISTS `physician`;

CREATE TABLE `physician` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `first` VARCHAR NOT NULL,
  `last` VARCHAR NOT NULL,
  `email` VARCHAR NOT NULL,
  `password` VARCHAR NOT NULL,
  `institition_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
KEY (`institition_id`)
);

-- ---
-- Table 'appointment'
--
-- ---

DROP TABLE IF EXISTS `appointment`;

CREATE TABLE `appointment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT DEFAULT NULL,
  `date` DATE NOT NULL,
  `time` TIME NULL,
  `notes` VARCHAR NULL,
  `id_physician` INTEGER NULL,
  `id_patient` INTEGER NULL DEFAULT NULL,
  `id_institution` INTEGER NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Patient_Form'
--
-- ---

DROP TABLE IF EXISTS `Patient_Form`;

CREATE TABLE `Patient_Form` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `doctor_notes` VARCHAR NULL,
  `id_physician` INTEGER NULL DEFAULT NULL,
  `id_patient` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'medication'
--
-- ---

DROP TABLE IF EXISTS `medication`;

CREATE TABLE `medication` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `drug_name` VARCHAR NULL,
  `dosage` VARCHAR NULL,
  `details` INTEGER NULL,
  `physician_id` INTEGER NULL DEFAULT NULL,
  `id_patient` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'institution'
--
-- ---

DROP TABLE IF EXISTS `institution`;

CREATE TABLE `institution` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `inst_name` VARCHAR NULL,
  `type` VARCHAR NULL,
  `description` VARCHAR NULL,
  `rating` INTEGER(1) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'payment'
--
-- ---

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `copay` INTEGER NULL,
  `bill` INTEGER NULL,
  `bill_statement` VARCHAR NULL,
  `due_date` DATE NULL,
  `id_physician` INTEGER NULL DEFAULT NULL,
  `id_patient` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'health_log'
--
-- ---

DROP TABLE IF EXISTS `health_log`;

CREATE TABLE `health_log` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `date` DATE NULL,
  `note` VARCHAR NULL,
  `id_physician` INTEGER NULL,
  `id_patient` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'appointment_document'
--
-- ---

DROP TABLE IF EXISTS `appointment_document`;

CREATE TABLE `appointment_document` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `document` BLOB NULL,
  `id_appointment` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'insurance_client'
--
-- ---

DROP TABLE IF EXISTS `insurance_client`;

CREATE TABLE `insurance_client` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `company_name` VARCHAR NULL,
  `username` INTEGER NULL,
  `password` VARCHAR NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'insurance'
--
-- ---

DROP TABLE IF EXISTS `insurance`;

CREATE TABLE `insurance` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `company_name` VARCHAR NULL,
  `type` VARCHAR NULL DEFAULT NULL,
  `policy_number` INTEGER NULL,
  `id_insurance_client` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'administration'
--
-- ---

DROP TABLE IF EXISTS `administration`;

CREATE TABLE `administration` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `login` VARCHAR NULL,
  `password` INTEGER NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'emergency_contact'
--
-- ---

DROP TABLE IF EXISTS `emergency_contact`;

CREATE TABLE `emergency_contact` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `first` VARCHAR NULL,
  `last` VARCHAR NULL,
  `phone` INTEGER NULL,
  `email` VARCHAR NULL,
  `relationship` VARCHAR NULL,
  `id_patient` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `patient` ADD FOREIGN KEY (id_insurance) REFERENCES `insurance` (`id`);
ALTER TABLE `physician` ADD FOREIGN KEY (institition_id) REFERENCES `institution` (`id`);
ALTER TABLE `appointment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `appointment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `appointment` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);
ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `medication` ADD FOREIGN KEY (physician_id) REFERENCES `physician` (`id`);
ALTER TABLE `medication` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `payment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `payment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `health_log` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `health_log` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `appointment_document` ADD FOREIGN KEY (id_appointment) REFERENCES `appointment` (`id`);
ALTER TABLE `insurance` ADD FOREIGN KEY (id_insurance_client) REFERENCES `insurance_client` (`id`);
ALTER TABLE `emergency_contact` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `patient` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `physician` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `appointment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Patient_Form` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `medication` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `institution` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `payment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `health_log` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `appointment_document` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `insurance_client` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `insurance` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `administration` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `emergency_contact` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `patient` (`id`,`first`,`last`,`email`,`password`,`pin`,`data_of_birth`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`id_insurance`) VALUES
-- ('','','','','','','','','','','','','','','','');
-- INSERT INTO `physician` (`id`,`first`,`last`,`email`,`password`,`institition_id`) VALUES
-- ('','','','','','');
-- INSERT INTO `appointment` (`id`,`date`,`time`,`notes`,`id_physician`,`id_patient`,`id_institution`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Patient_Form` (`id`,`doctor_notes`,`id_physician`,`id_patient`) VALUES
-- ('','','','');
-- INSERT INTO `medication` (`id`,`drug_name`,`dosage`,`details`,`physician_id`,`id_patient`) VALUES
-- ('','','','','','');
-- INSERT INTO `institution` (`id`,`inst_name`,`type`,`description`,`rating`) VALUES
-- ('','','','','');
-- INSERT INTO `payment` (`id`,`copay`,`bill`,`bill_statement`,`due_date`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','');
-- INSERT INTO `health_log` (`id`,`date`,`note`,`id_physician`,`id_patient`) VALUES
-- ('','','','','');
-- INSERT INTO `appointment_document` (`id`,`document`,`id_appointment`) VALUES
-- ('','','');
-- INSERT INTO `insurance_client` (`id`,`company_name`,`username`,`password`) VALUES
-- ('','','','');
-- INSERT INTO `insurance` (`id`,`company_name`,`type`,`policy_number`,`id_insurance_client`) VALUES
-- ('','','','','');
-- INSERT INTO `administration` (`id`,`login`,`password`) VALUES
-- ('','','');
-- INSERT INTO `emergency_contact` (`id`,`first`,`last`,`phone`,`email`,`relationship`,`id_patient`) VALUES
-- ('','','','','','','');
