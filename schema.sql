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
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(30) NULL DEFAULT NULL,
  `last` VARCHAR(30) NULL DEFAULT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(300) NULL DEFAULT NULL,
  `pin` INTEGER(4) NULL DEFAULT NULL,
  `date_of_birth` DATE NULL DEFAULT NULL,
  `address` VARCHAR(60) NULL DEFAULT NULL,
  `city` VARCHAR(60) NULL DEFAULT NULL,
  `state` VARCHAR(2) NULL DEFAULT NULL,
  `zip` VARCHAR(10) NULL DEFAULT NULL,
  `phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `weight` INTEGER NULL DEFAULT NULL,
  `height` INTEGER NULL DEFAULT NULL,
  `blood_type` VARCHAR(3) NULL DEFAULT NULL,
  `photo_path` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'physician'
--
-- ---

DROP TABLE IF EXISTS `physician`;

CREATE TABLE `physician` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(30) NULL,
  `last` VARCHAR(30) NULL,
  `email` VARCHAR(30) NULL,
  `phone_number` VARCHAR(20) NULL,
  `password` VARCHAR(30) NULL,
  `photo_path` VARCHAR(300) NULL,
  `specialty` VARCHAR(500) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'appointment'
--
-- ---

DROP TABLE IF EXISTS `appointment`;

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

-- ---
-- Table 'Patient_Form'
--
-- ---

DROP TABLE IF EXISTS `Patient_Form`;

CREATE TABLE `Patient_Form` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `doctor_notes` VARCHAR(5000) NULL DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'medication'
--
-- ---

DROP TABLE IF EXISTS `medication`;

CREATE TABLE `medication` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `drug_name` VARCHAR(100) NULL DEFAULT NULL,
  `details` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'institution'
--
-- ---

DROP TABLE IF EXISTS `institution`;

CREATE TABLE `institution` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `inst_name` VARCHAR(30) NULL DEFAULT NULL,
  `type` VARCHAR(25) NULL DEFAULT NULL,
  `description` VARCHAR(300) NULL DEFAULT NULL,
  `rating` INTEGER(5) NULL DEFAULT NULL,
  `phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `address` VARCHAR(300) NULL,
  `city` VARCHAR(50) NULL,
  `state` VARCHAR(3) NULL,
  `zip` VARCHAR(10) NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'payment'
--
-- ---

DROP TABLE IF EXISTS `payment`;

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

-- ---
-- Table 'health_log'
--
-- ---

DROP TABLE IF EXISTS `health_log`;

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

-- ---
-- Table 'appointment_document'
--
-- ---

DROP TABLE IF EXISTS `appointment_document`;

CREATE TABLE `appointment_document` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `document` BLOB(400) NULL DEFAULT NULL,
  `id_appointment` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'insurance_company_professional'
--
-- ---

DROP TABLE IF EXISTS `insurance_company_professional`;

CREATE TABLE `insurance_company_professional` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(30) NULL DEFAULT NULL,
  `username` VARCHAR(40) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `id_Insurance_company` INTEGER NULL DEFAULT NULL,
  `photo_path` VARCHAR(300) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'insurance_plan'
--
-- ---

DROP TABLE IF EXISTS `insurance_plan`;

CREATE TABLE `insurance_plan` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `plan` VARCHAR(100) NULL,
  `policy_number` VARCHAR(100) NULL DEFAULT NULL,
  `member_id` VARCHAR(30) NULL,
  `payer_id` VARCHAR(20) NULL,
  `id_patient` INTEGER DEFAULT NULL,
  `id_Insurance_company` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'administration'
--
-- ---

DROP TABLE IF EXISTS `administration`;

CREATE TABLE `administration` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(25) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'emergency_contact'
--
-- ---

DROP TABLE IF EXISTS `emergency_contact`;

CREATE TABLE `emergency_contact` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(30) NULL DEFAULT NULL,
  `last` VARCHAR(30) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(30) NULL DEFAULT NULL,
  `relationship` VARCHAR(30) NULL DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'patient_medication'
--
-- ---

DROP TABLE IF EXISTS `patient_medication`;

CREATE TABLE `patient_medication` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `drug_name` VARCHAR(100) NULL DEFAULT NULL,
  `dosage` VARCHAR(100) NULL DEFAULT NULL,
  `id_medication` INTEGER DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'physician_institution'
--
-- ---

DROP TABLE IF EXISTS `physician_institution`;

CREATE TABLE `physician_institution` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_institution` INTEGER DEFAULT NULL,
  `id_physician` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `direct_message` VARCHAR(10000) NULL DEFAULT NULL,
  `date` TIMESTAMP NULL DEFAULT NULL,
  `sender_id` INTEGER DEFAULT NULL,
  `receiver_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'patient_physician'
--
-- ---

DROP TABLE IF EXISTS `patient_physician`;

CREATE TABLE `patient_physician` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_physician` INTEGER DEFAULT NULL,
  `id_patient` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Insurance_company'
--
-- ---

DROP TABLE IF EXISTS `Insurance_company`;

CREATE TABLE `Insurance_company` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) NULL,
  `phone_number_for_patients` VARCHAR(20) NULL,
  `phone_number_for_institutions` VARCHAR(20) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'company_insurance_plan_types'
--
-- ---

DROP TABLE IF EXISTS `company_insurance_plan_types`;

CREATE TABLE `company_insurance_plan_types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_insurance` INTEGER DEFAULT NULL,
  `id_Insurance_company` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'staff'
--
-- ---

DROP TABLE IF EXISTS `staff`;

CREATE TABLE `staff` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `first` VARCHAR(50) NULL,
  `last` VARCHAR(50) NULL,
  `email` VARCHAR(100) NULL,
  `phone_number` VARCHAR(25) NULL,
  `password` VARCHAR(200) NULL,
  `photo_path` VARCHAR(300) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'institution_staff'
--
-- ---

DROP TABLE IF EXISTS `institution_staff`;

CREATE TABLE `institution_staff` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_staff` INTEGER DEFAULT NULL,
  `id_institution` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `appointment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `appointment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `appointment` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);
ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `payment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `payment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `health_log` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `health_log` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `appointment_document` ADD FOREIGN KEY (id_appointment) REFERENCES `appointment` (`id`);
ALTER TABLE `insurance_company_professional` ADD FOREIGN KEY (id_Insurance_company) REFERENCES `Insurance_company` (`id`);
ALTER TABLE `insurance_plan` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `insurance_plan` ADD FOREIGN KEY (id_Insurance_company) REFERENCES `Insurance_company` (`id`);
ALTER TABLE `emergency_contact` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `patient_medication` ADD FOREIGN KEY (id_medication) REFERENCES `medication` (`id`);
ALTER TABLE `patient_medication` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `patient_medication` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `physician_institution` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);
ALTER TABLE `physician_institution` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `patient_physician` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `patient_physician` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `company_insurance_plan_types` ADD FOREIGN KEY (id_insurance) REFERENCES `insurance_plan` (`id`);
ALTER TABLE `company_insurance_plan_types` ADD FOREIGN KEY (id_Insurance_company) REFERENCES `Insurance_company` (`id`);
ALTER TABLE `institution_staff` ADD FOREIGN KEY (id_staff) REFERENCES `staff` (`id`);
ALTER TABLE `institution_staff` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);

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
-- ALTER TABLE `insurance_company_professional` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `insurance_plan` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `administration` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `emergency_contact` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `patient_medication` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `physician_institution` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `patient_physician` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Insurance_company` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `company_insurance_plan_types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `staff` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `institution_staff` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `patient` (`id`,`first`,`last`,`email`,`password`,`pin`,`date_of_birth`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES
-- ('','','','','','','','','','','','','','','','');
-- INSERT INTO `physician` (`id`,`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `appointment` (`id`,`date`,`time`,`notes`,`id_physician`,`id_patient`,`id_institution`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Patient_Form` (`id`,`doctor_notes`,`id_physician`,`id_patient`) VALUES
-- ('','','','');
-- INSERT INTO `medication` (`id`,`drug_name`,`details`) VALUES
-- ('','','');
-- INSERT INTO `institution` (`id`,`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO `payment` (`id`,`copay`,`bill`,`bill_statement`,`due_date`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','');
-- INSERT INTO `health_log` (`id`,`physician_date`,`physician_notes`,`physician_photo_path`,`patient_date`,`patient_note`,`patient_photo_path`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `appointment_document` (`id`,`document`,`id_appointment`) VALUES
-- ('','','');
-- INSERT INTO `insurance_company_professional` (`id`,`company_name`,`username`,`password`,`id_Insurance_company`,`photo_path`) VALUES
-- ('','','','','','');
-- INSERT INTO `insurance_plan` (`id`,`plan`,`policy_number`,`member_id`,`payer_id`,`id_patient`,`id_Insurance_company`) VALUES
-- ('','','','','','','');
-- INSERT INTO `administration` (`id`,`login`,`password`) VALUES
-- ('','','');
-- INSERT INTO `emergency_contact` (`id`,`first`,`last`,`phone`,`email`,`relationship`,`id_patient`) VALUES
-- ('','','','','','','');
-- INSERT INTO `patient_medication` (`id`,`drug_name`,`dosage`,`id_medication`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','');
-- INSERT INTO `physician_institution` (`id`,`id_institution`,`id_physician`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id`,`direct_message`,`date`,`sender_id`,`receiver_id`) VALUES
-- ('','','','','');
-- INSERT INTO `patient_physician` (`id`,`id_physician`,`id_patient`) VALUES
-- ('','','');
-- INSERT INTO `Insurance_company` (`id`,`company_name`,`phone_number_for_patients`,`phone_number_for_institutions`) VALUES
-- ('','','','');
-- INSERT INTO `company_insurance_plan_types` (`id`,`id_insurance`,`id_Insurance_company`) VALUES
-- ('','','');
-- INSERT INTO `staff` (`id`,`first`,`last`,`email`,`phone_number`,`password`,`photo_path`) VALUES
-- ('','','','','','','');
-- INSERT INTO `institution_staff` (`id`,`id_staff`,`id_institution`) VALUES
-- ('','','');
-- ---
-- Table Properties
-- ---


-- INSERT INTO `patient` (`id`,`first`,`last`,`email`,`password`,`pin`,`date_of_birth`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES
-- ('','','','','','','','','','','','','','','','');
-- INSERT INTO `physician` (`id`,`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `appointment` (`id`,`date`,`time`,`notes`,`id_physician`,`id_patient`,`id_institution`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Patient_Form` (`id`,`doctor_notes`,`id_physician`,`id_patient`) VALUES
-- ('','','','');
-- INSERT INTO `medication` (`id`,`drug_name`,`details`) VALUES
-- ('','','');
-- INSERT INTO `institution` (`id`,`inst_name`,`type`,`description`,`rating`,`phone_number`) VALUES
-- ('','','','','','');
-- INSERT INTO `payment` (`id`,`copay`,`bill`,`bill_statement`,`due_date`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','');
-- INSERT INTO `health_log` (`id`,`physician_date`,`physician_notes`,`physician_photo_path`,`patient_date`,`patient_note`,`patient_photo_path`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `appointment_document` (`id`,`document`,`id_appointment`) VALUES
-- ('','','');
-- INSERT INTO `insurance_company_client` (`id`,`company_name`,`username`,`password`) VALUES
-- ('','','','');
-- INSERT INTO `insurance` (`id`,`company_name`,`policy_number`,`type`,`id_insurance_client`,`id_patient`) VALUES
-- ('','','','','','');
-- INSERT INTO `administration` (`id`,`login`,`password`) VALUES
-- ('','','');
-- INSERT INTO `emergency_contact` (`id`,`first`,`last`,`phone`,`email`,`relationship`,`id_patient`) VALUES
-- ('','','','','','','');
-- INSERT INTO `patient_medication` (`id`,`drug_name`,`dosage`,`id_medication`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','');
-- INSERT INTO `physician_institution` (`id`,`id_institution`,`id_physician`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id`,`direct_message`,`date`,`sender_id`,`receiver_id`,`previous_message_id`) VALUES
-- ('','','','','','');
-- INSERT INTO `patient_physician` (`id`,`id_physician`,`id_patient`) VALUES
-- ('','','');
-- ---
-- Test Data
-- ---

-- INSERT INTO `patient` (`id`,`first`,`last`,`email`,`password`,`pin`,`date_of_birth`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES
-- ('','','','','','','','','','','','','','','','');
-- INSERT INTO `physician` (`id`,`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `appointment` (`id`,`date`,`time`,`notes`,`id_physician`,`id_patient`,`id_institution`) VALUES
-- ('','','','','','','');
-- INSERT INTO `Patient_Form` (`id`,`doctor_notes`,`id_physician`,`id_patient`) VALUES
-- ('','','','');
-- INSERT INTO `medication` (`id`,`drug_name`,`details`) VALUES
-- ('','','');
-- INSERT INTO `institution` (`id`,`inst_name`,`type`,`description`,`rating`,`phone_number`) VALUES
-- ('','','','','','');
-- INSERT INTO `payment` (`id`,`copay`,`bill`,`bill_statement`,`due_date`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','');
-- INSERT INTO `health_log` (`id`,`physician_date`,`physician_notes`,`physician_photo_path`,`patient_date`,`patient_note`,`patient_photo_path`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `appointment_document` (`id`,`document`,`id_appointment`) VALUES
-- ('','','');
-- INSERT INTO `insurance_company_client` (`id`,`company_name`,`username`,`password`) VALUES
-- ('','','','');
-- INSERT INTO `insurance` (`id`,`company_name`,`policy_number`,`type`,`id_insurance_client`,`id_patient`) VALUES
-- ('','','','','','');
-- INSERT INTO `administration` (`id`,`login`,`password`) VALUES
-- ('','','');
-- INSERT INTO `emergency_contact` (`id`,`first`,`last`,`phone`,`email`,`relationship`,`id_patient`) VALUES
-- ('','','','','','','');
-- INSERT INTO `patient_medication` (`id`,`drug_name`,`dosage`,`id_medication`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','');
-- INSERT INTO `physician_institution` (`id`,`id_institution`,`id_physician`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id`,`direct_message`,`date`,`sender_id`,`receiver_id`,`previous_message_id`) VALUES
-- ('','','','','','');
-- INSERT INTO `patient_physician` (`id`,`id_physician`,`id_patient`) VALUES
-- ('','','');
