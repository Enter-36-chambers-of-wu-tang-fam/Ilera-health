-- ---
-- Globals
-- ---
DROP DATABASE IF EXISTS `Ilera`;

CREATE DATABASE `Ilera`;

USE Ilera;

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'patient'
--
-- ---

DROP TABLE IF EXISTS `patient`;

CREATE TABLE `patient` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(30) NOT NULL,
  `last` VARCHAR(30) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(30) NOT NULL,
  `pin` INTEGER(4) DEFAULT NULL,
  `data_of_birth` DATE NULL,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR(30) NULL,
  `state` VARCHAR(2) NULL,
  `zip` INTEGER NULL,
  `phone_number` INTEGER NULL,
  `weight` INTEGER(10) NULL,
  `height` INTEGER(10) NULL,
  `blood_type` VARCHAR(3) NULL,
  `id_insurance` INTEGER UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'physician'
--
-- ---

DROP TABLE IF EXISTS `physician`;

CREATE TABLE `physician` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(20) NOT NULL,
  `last` VARCHAR(20) NOT NULL,
  `email` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `institition_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`),
KEY (`institition_id`)
);

-- ---
-- Table 'appointment'
--
-- ---

DROP TABLE IF EXISTS `appointment`;

CREATE TABLE `appointment` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `time` TIME NULL,
  `notes` VARCHAR(200) NULL,
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
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `doctor_notes` VARCHAR(200) NULL,
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
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `drug_name` VARCHAR(20) NULL,
  `dosage` VARCHAR(20) NULL,
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
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `inst_name` VARCHAR(200) NULL,
  `type` VARCHAR(200) NULL,
  `description` VARCHAR(200) NULL,
  `rating` INTEGER(1) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'payment'
--
-- ---

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `copay` INTEGER NULL,
  `bill` INTEGER NULL,
  `bill_statement` VARCHAR(200) NULL,
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
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `note` VARCHAR(300) NULL,
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
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `document` BLOB NULL,
  `id_appointment` INTEGER UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'insurance_client'
--
-- ---

DROP TABLE IF EXISTS `insurance_client`;

CREATE TABLE `insurance_client` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(20) NULL,
  `username` INTEGER NULL,
  `password` VARCHAR(30) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'insurance'
--
-- ---

DROP TABLE IF EXISTS `insurance`;

CREATE TABLE `insurance` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(40) NULL,
  `type` VARCHAR(40) NULL DEFAULT NULL,
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
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(40) NULL,
  `password` INTEGER NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'emergency_contact'
--
-- ---

DROP TABLE IF EXISTS `emergency_contact`;

CREATE TABLE `emergency_contact` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(30) NULL,
  `last` VARCHAR(30) NULL,
  `phone` INTEGER NULL,
  `email` VARCHAR(40) NULL,
  `relationship` VARCHAR(30) NULL,
  `id_patient` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `patient` ADD FOREIGN KEY (id_insurance) REFERENCES `insurance` (`id`);
-- ALTER TABLE `physician` ADD FOREIGN KEY (institition_id) REFERENCES `institution` (`id`);
-- ALTER TABLE `appointment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
-- ALTER TABLE `appointment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
-- ALTER TABLE `appointment` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);
-- ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
-- ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
-- ALTER TABLE `medication` ADD FOREIGN KEY (physician_id) REFERENCES `physician` (`id`);
-- ALTER TABLE `medication` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
-- ALTER TABLE `payment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
-- ALTER TABLE `payment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
-- ALTER TABLE `health_log` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
-- ALTER TABLE `health_log` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
-- ALTER TABLE `appointment_document` ADD FOREIGN KEY (id_appointment) REFERENCES `appointment` (`id`);
-- ALTER TABLE `insurance` ADD FOREIGN KEY (id_insurance_client) REFERENCES `insurance_client` (`id`);
-- ALTER TABLE `emergency_contact` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);

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
