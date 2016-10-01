-- ---
-- Globals
-- ---

DROP DATABASE IF EXISTS `Ilera`;

CREATE DATABASE `Ilera`;

USE Ilera;



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
  `password` VARCHAR(300) NULL,
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
  `details` VARCHAR(1000) NULL DEFAULT NULL,
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
-- this is to store the bill of each visit the patient makes to the doctor
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
-- this is a way for the doctor to assign a health/workout regimen
-- --- and for the patient to log their health as they follow the regimen

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
-- this is for the seperate documents that may be required for patients to fill out before each visit
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
-- this is for the insurance professionals to have a user profile to monitor customer bills and such
-- ---

DROP TABLE IF EXISTS `insurance_company_professional`;

CREATE TABLE `insurance_company_professional` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(30) NULL DEFAULT NULL,
  `username` VARCHAR(40) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  `id_Insurance_company` INTEGER NULL DEFAULT NULL,
  `phone_number` VARCHAR(30) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL,
  `photo_path` VARCHAR(300) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'insurance_plan'
-- these are the individual plans the insurance companies offer patients
-- --- one to one relation for each patients to each plan

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

--
-- Table structure for table `insurance`
--

DROP TABLE IF EXISTS `insurance`;

CREATE TABLE `insurance` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `insurer` VARCHAR(255) NULL,
  `type` VARCHAR(255) NULL,
  `network` VARCHAR(255) NULL,
  `uid` VARCHAR(255) NULL,
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
-- the mediacation inforrmation of each patient is stored
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
-- for establishing relation between patient and physician
-- --- many to many relation

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
  `sender_id` INTEGER NULL,
  `receiver_id` INTEGER NULL,
  `sender_type` VARCHAR(300) NULL,
  `receiver_type` VARCHAR(300) NULL,
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
-- --- grouped by REFERENCES

ALTER TABLE `appointment_document` ADD FOREIGN KEY (id_appointment) REFERENCES `appointment` (`id`);

ALTER TABLE `appointment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `payment` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `health_log` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `patient_medication` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `physician_institution` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);
ALTER TABLE `patient_physician` ADD FOREIGN KEY (id_physician) REFERENCES `physician` (`id`);

ALTER TABLE `patient_medication` ADD FOREIGN KEY (id_medication) REFERENCES `medication` (`id`);

ALTER TABLE `appointment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `Patient_Form` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `payment` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `health_log` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `insurance_plan` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `patient_physician` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `patient_medication` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);
ALTER TABLE `emergency_contact` ADD FOREIGN KEY (id_patient) REFERENCES `patient` (`id`);

ALTER TABLE `appointment` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);
ALTER TABLE `institution_staff` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);
ALTER TABLE `physician_institution` ADD FOREIGN KEY (id_institution) REFERENCES `institution` (`id`);

ALTER TABLE `institution_staff` ADD FOREIGN KEY (id_staff) REFERENCES `staff` (`id`);

ALTER TABLE `insurance_company_professional` ADD FOREIGN KEY (id_Insurance_company) REFERENCES `Insurance_company` (`id`);
ALTER TABLE `company_insurance_plan_types` ADD FOREIGN KEY (id_Insurance_company) REFERENCES `Insurance_company` (`id`);
ALTER TABLE `insurance_plan` ADD FOREIGN KEY (id_Insurance_company) REFERENCES `Insurance_company` (`id`);

ALTER TABLE `company_insurance_plan_types` ADD FOREIGN KEY (id_insurance) REFERENCES `insurance_plan` (`id`);


-- ---
-- Data For Testing Purposes
-- ---

-- INSERT INTO `physician` (`id`,`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES
-- ('','','','','','','','');
INSERT INTO `physician` (`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES ('neekon','nee','nee','34214321','nee','nee','nee');

INSERT INTO `physician` (`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES ('yolo','bee','bee','34321235','bee','bee','bee');
-- INSERT INTO `patient` (`id`,`first`,`last`,`email`,`password`,`pin`,`date_of_birth`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES
-- ('','','','','','','','','','','','','','','','');
INSERT INTO `patient` (`first`,`last`,`email`,`password`,`pin`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES ('bal','bon','afsjon','2345rew','14','mya','at','ca','43522','2435','1231','123','4','a');
INSERT INTO `patient` (`first`,`last`,`email`,`password`,`pin`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES ('abn','bon','jon','2345rew','14','mj','sarat','ca','43522','2435','1231','123','4','a');


-- INSERT INTO `patient_physician` (`id`,`id_physician`,`id_patient`) VALUES
-- ('','','');
INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('1','1');
INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('1','2');
INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('2','2');
INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('2','1');


-- INSERT INTO `institution` (`id`,`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES
-- ('','','','','','','','','','','');
INSERT INTO `institution` (`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES ('wu tang','36chambers','fixer','12','1423','2413','sanjose','ca','4231','wu@gmail');
INSERT INTO `institution` (`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES ('gza','chamberlane','tester','54','3542','4123','frisco','va','4231','wafsdu@gmail');

-- INSERT INTO `physician_institution` (`id`,`id_institution`,`id_physician`) VALUES
-- ('','','');
INSERT INTO `physician_institution` (`id_institution`,`id_physician`) VALUES ('1','1');
INSERT INTO `physician_institution` (`id_institution`,`id_physician`) VALUES ('1','2');


-- INSERT INTO `health_log` (`id`,`physician_date`,`physician_notes`,`physician_photo_path`,`patient_date`,`patient_note`,`patient_photo_path`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','','','');
INSERT INTO `health_log` (`physician_notes`,`physician_photo_path`,`patient_note`,`patient_photo_path`,`id_physician`,`id_patient`) VALUES ('he needs to shape up','upyours','doctor sucks','yolo','1','1');
INSERT INTO `health_log` (`physician_notes`,`physician_photo_path`,`patient_note`,`patient_photo_path`,`id_physician`,`id_patient`) VALUES ('he make big moves','upyours and hers','doctor sucks at life','yolo is my name o','1','2');
INSERT INTO `health_log` (`physician_notes`,`physician_photo_path`,`patient_note`,`patient_photo_path`,`id_physician`,`id_patient`) VALUES ('he make big moves all day erry day','up this','doctor sucks at life and more','yolo is my name o bro','2','2');

-- INSERT INTO `messages` (`id`,`direct_message`,`date`,`sender_id`,`receiver_id`) VALUES
-- ('','','','','');
INSERT INTO `messages` (`direct_message`,`sender_id`,`receiver_id`,`sender_type`, `receiver_type`) VALUES ('what up','1','2','physician','patient');
INSERT INTO `messages` (`direct_message`,`sender_id`,`receiver_id`,`sender_type`, `receiver_type`) VALUES ('hello bernard livelars','1','2','physician','patient');
INSERT INTO `messages` (`direct_message`,`sender_id`,`receiver_id`,`sender_type`, `receiver_type`) VALUES ('yolo','2','1','patient','physician');
INSERT INTO `messages` (`direct_message`,`sender_id`,`receiver_id`,`sender_type`, `receiver_type`) VALUES ('howdy','2','1','patient','physician');

-- INSERT INTO `emergency_contact` (`id`,`first`,`last`,`phone`,`email`,`relationship`,`id_patient`) VALUES
-- ('','','','','','','');
INSERT INTO `emergency_contact` (`first`,`last`,`phone`,`email`,`relationship`,`id_patient`) VALUES ('helen','yara','1234','yolomail','momma','1');

-- INSERT INTO `medication` (`id`,`drug_name`,`details`) VALUES
-- ('','','');
INSERT INTO `medication` (`drug_name`,`details`) VALUES ('kush','thr stickiest of the ickiest');

INSERT INTO `patient_medication` (`drug_name`,`dosage`,`id_medication`,`id_physician`,`id_patient`) VALUES ('kush','enough','1','1','1');
INSERT INTO `appointment` (`date`,`time`,`notes`,`id_physician`,`id_patient`,`id_institution`) VALUES ('2016-10-20','230','needs to protect his kneck','1','1','1');

INSERT INTO `appointment_document` (`document`,`id_appointment`) VALUES ('yolo','1');


-- INSERT INTO `administration` (`id`,`login`,`password`) VALUES
-- ('','','');

-- INSERT INTO `company_insurance_plan_types` (`id`,`id_insurance`,`id_Insurance_company`) VALUES
-- ('','','');


-- INSERT INTO `Patient_Form` (`id`,`doctor_notes`,`id_physician`,`id_patient`) VALUES
-- ('','','','');


-- INSERT INTO `payment` (`id`,`copay`,`bill`,`bill_statement`,`due_date`,`id_physician`,`id_patient`) VALUES
-- ('','','','','','','');

-- INSERT INTO `Insurance_company` (`id`,`company_name`,`phone_number_for_patients`,`phone_number_for_institutions`) VALUES
-- ('','','','');

-- INSERT INTO `insurance_company_professional` (`id`,`company_name`,`username`,`password`,`id_Insurance_company`,`photo_path`) VALUES
-- ('','','','','','');

-- INSERT INTO `insurance_plan` (`id`,`plan`,`policy_number`,`member_id`,`payer_id`,`id_patient`,`id_Insurance_company`) VALUES
-- ('','','','','','','');


-- INSERT INTO `institution_staff` (`id`,`id_staff`,`id_institution`) VALUES
-- ('','','');
-- INSERT INTO `staff` (`id`,`first`,`last`,`email`,`phone_number`,`password`,`photo_path`) VALUES
-- ('','','','','','','');

--

-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Oct 01, 2016 at 04:25 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------


-- ENGINE=InnoDB AUTO_INCREMENT=739 DEFAULT CHARSET=latin1
--
-- Dumping data for table `insurance`
--

INSERT INTO `insurance` (`id`, `insurer`, `type`, `network`, `uid`) VALUES
(1, 'Advantage Health Solutions', 'medical', 'Advantage Health 360 Main', 'advantagehealthsolutions-advantagehealth360main'),
(2, 'Aetna', 'medical', 'Advantage 6350 - HIX', 'aetna-aetnaadvantage6350hix'),
(3, 'Aetna', 'medical', 'Aetna Advantage 6350', 'aetna-aetnaadvantage6350'),
(4, 'Aetna', 'medical', 'Aetna Basic HMO', 'aetna-aetnabasichmo'),
(5, 'Aetna', 'medical', 'Aetna Choice POS II', 'aetna-aetnachoiceposii'),
(6, 'Aetna', 'medical', 'Aetna Choice POS Open Access', 'aetna-aetnachoiceposopenaccess'),
(7, 'Aetna', 'medical', 'Aetna DMO', 'aetna-aetnadmo'),
(8, 'Aetna', 'dental', 'Aetna DPPO', 'aetna-aetnadppo'),
(9, 'Aetna', 'medical', 'Aetna Elect Choice EPO', 'aetna-aetnaelectchoiceepo'),
(10, 'Aetna', 'medical', 'Aetna HMO', 'aetna-aetnahmo'),
(11, 'Aetna', 'medical', 'Aetna HMO Deductible Plan CA members only', 'aetna-aetnahmodeductibleplancamembersonly'),
(12, 'Aetna', 'medical', 'Aetna Health Network Option Open Access', 'aetna-aetnahealthnetworkoptionopenaccess'),
(13, 'Aetna', 'medical', 'Aetna Managed Choice POS Open Access', 'aetna-aetnamanagedchoiceposopenaccess'),
(14, 'Aetna', 'medical', 'Aetna Savings Plus of AZ', 'aetna-aetnasavingsplusofaz'),
(15, 'Aetna', 'medical', 'Aetna Savings Plus of CA', 'aetna-aetnasavingsplusofca'),
(16, 'Aetna', 'medical', 'Aetna Select', 'aetna-aetnaselect'),
(17, 'Aetna', 'medical', 'Aetna Signature Administrators PPO', 'aetna-aetnasignatureadministratorsppo'),
(18, 'Aetna', 'medical', 'Aetna Vitalidad Plus CA con Aetna', 'aetna-aetnavitalidadpluscaconaetna'),
(19, 'Aetna', 'medical', 'Aetna Whole Health Banner Health Network HMO', 'aetna-aetnawholehealthbannerhealthnetworkhmo'),
(20, 'Aetna', 'medical', 'Aetna Whole Health Colorado Front Range', 'aetna-aetnawholehealthcoloradofrontrange'),
(21, 'Aetna', 'medical', 'Aetna Whole Health PrimeCare HMO CA', 'aetna-aetnawholehealthprimecarehmoca'),
(22, 'Aetna', 'medical', 'Aetna Whole Health PrimeCare OAMC CA', 'aetna-aetnawholehealthprimecareoamcca'),
(23, 'Aetna', 'medical', 'Basic - HIX', 'aetna-aetnabasichix'),
(24, 'Aetna', 'medical', 'MD Bronze Silver  Gold - HMO', 'aetna-aetnamdbronzesilverandgoldhmo'),
(25, 'Altius Coventry Health Care', 'medical', 'Altius Provider Directory', 'altiuscoventryhealthcare-altiusproviderdirectory'),
(26, 'Ambetter Superior Health Plan', 'medical', 'Ambetter Superior Health Plan', 'ambettersuperiorhealthplan-ambettersuperiorhealthplan'),
(27, 'Amerihealth', 'medical', 'Amerihealth Local Value Network EPO POS PPO', 'amerihealth-amerihealthlocalvaluenetworkepoposppo'),
(28, 'Amerihealth', 'medical', 'Amerihealth Local Value Network HMO HMO POS', 'amerihealth-amerihealthlocalvaluenetworkhmohmopos'),
(29, 'Amerihealth', 'medical', 'Amerihealth Regional Pref Ntwk EPO POS PPO', 'amerihealth-amerihealthregionalprefntwkepoposppo'),
(30, 'Amerihealth', 'medical', 'Amerihealth Regional Pref Ntwk HMO HMO POS', 'amerihealth-amerihealthregionalprefntwkhmohmopos'),
(31, 'Ameritas', 'medical', 'Ameritas PPO', 'ameritas-ameritasppo'),
(32, 'Anthem', 'medical', 'Anthem Blue Access PPO', 'anthem-anthemblueaccessppo'),
(33, 'Anthem', 'medical', 'Anthem Blue Open Access POS', 'anthem-anthemblueopenaccesspos'),
(34, 'Anthem', 'medical', 'Anthem Blue Preferred HMO', 'anthem-anthembluepreferredhmo'),
(35, 'Anthem', 'medical', 'Anthem Blue Preferred Plus POS', 'anthem-anthembluepreferredpluspos'),
(36, 'Anthem', 'medical', 'Anthem Blue Preferred Select', 'anthem-anthembluepreferredselect'),
(37, 'Anthem', 'medical', 'Anthem CO Blue Priority PPO', 'anthem-anthemcobluepriorityppo'),
(38, 'Anthem', 'medical', 'Anthem CO Pathway', 'anthem-anthemcopathway'),
(39, 'Anthem', 'medical', 'Anthem CO Pathway X Enhanced Ind Direct Access', 'anthem-anthemcopathwayxenhancedinddirectaccess'),
(40, 'Anthem', 'medical', 'Anthem HealthKeepers HMOPOS', 'anthem-anthemhealthkeepershmopos'),
(41, 'Anthem', 'medical', 'Anthem IN Pathway X Bronze Direct CACA HIX', 'anthem-antheminpathwayxbronzedirectcacahix'),
(42, 'Anthem', 'medical', 'Anthem KY Pathway X Ind Direct Access', 'anthem-anthemkypathwayxinddirectaccess'),
(43, 'Anthem', 'medical', 'Anthem KeyCare PPO', 'anthem-anthemkeycareppo'),
(44, 'Anthem', 'medical', 'Anthem MO Direct Access wHSA', 'anthem-anthemmodirectaccesswhsa'),
(45, 'Anthem', 'medical', 'Anthem NV Pathway PPO', 'anthem-anthemnvpathwayppo'),
(46, 'Anthem', 'medical', 'Anthem NV Pathway X HMOInd Direct Access', 'anthem-anthemnvpathwayxhmoinddirectaccess'),
(47, 'Anthem', 'medical', 'Anthem OH Pathway X Tiered HospInd Direct Access', 'anthem-anthemohpathwayxtieredhospinddirectaccess'),
(48, 'Anthem', 'medical', 'Anthem PPO', 'anthem-anthemppo'),
(49, 'Anthem', 'medical', 'Anthem PPO Century Preferred - CT', 'anthem-anthemppocenturypreferredct'),
(50, 'Anthem', 'medical', 'Anthem Pathway X EnhancedInd Direct Access NH', 'anthem-anthempathwayxenhancedinddirectaccessnh'),
(51, 'Anthem', 'medical', 'Anthem Pathway X EnhancedInd Guided Access ME', 'anthem-anthempathwayxenhancedindguidedaccessme'),
(52, 'Anthem', 'medical', 'Anthem Pathway X Ind PPO Direct Access CT', 'anthem-anthempathwayxindppodirectaccessct'),
(53, 'Anthem', 'medical', 'Anthem Pathway X Tier Hosp HealthKeepers DirectAccess VA', 'anthem-anthempathwayxtierhosphealthkeepersdirectaccessva'),
(54, 'Anthem', 'medical', 'Anthem WI Blue Priority XIndiv DirectAccess', 'anthem-anthemwibluepriorityxindivdirectaccess'),
(55, 'Anthem', 'dental', 'BC CA Dental Blue 100200300', 'bluecrosscalifornia-bccadentalblue100200300'),
(56, 'Anthem', 'medical', 'Blue Cross CA Advantage PPO Preferred DirectAccess Plus', 'bluecrosscalifornia-bluecrosscaadvantageppopreferreddirectaccessplus'),
(57, 'Anthem', 'medical', 'Blue Cross CA CaliforniaCare HMO', 'bluecrosscalifornia-bluecrosscacaliforniacarehmo'),
(58, 'Anthem', 'medical', 'Blue Cross CA PPO', 'bluecrosscalifornia-bluecrosscappo'),
(59, 'Anthem', 'medical', 'Blue Cross CA Pathway X HMO Guided Access', 'bluecrosscalifornia-bluecrosscapathwayxhmoguidedaccess'),
(60, 'Anthem', 'medical', 'Blue Cross CA Pathway X PPO Direct Access', 'bluecrosscalifornia-bluecrosscapathwayxppodirectaccess'),
(61, 'Anthem', 'medical', 'Blue Cross CA Pathway X Tiered Direct Access', 'bluecrosscalifornia-bluecrosscapathwayxtiereddirectaccess'),
(62, 'Anthem', 'medical', 'Blue Cross CA PowerSelect HMO', 'bluecrosscalifornia-bluecrosscapowerselecthmo'),
(63, 'Anthem', 'medical', 'Blue Cross CA Priority Select HMO', 'bluecrosscalifornia-bluecrosscapriorityselecthmo'),
(64, 'Anthem', 'medical', 'Blue Cross CA Select PPO', 'bluecrosscalifornia-bluecrosscaselectppo'),
(65, 'Anthem', 'medical', 'Blue Cross CA Select Plus HMO', 'bluecrosscalifornia-bluecrosscaselectplushmo'),
(66, 'Anthem', 'vision', 'Blue View Vision', 'anthem-blueviewvision'),
(67, 'Anthem', 'medical', 'Bronze DirectAccess Plus - gjqa', 'anthembluecrossblueshield-bronzedirectaccessplusgjqa'),
(68, 'Anthem', 'medical', 'Gold DirectAccess Plus with HSA', 'anthembluecrossblueshield-golddirectaccesspluswhsa'),
(69, 'Assurant', 'medical', 'Assurant DHA', 'assurant-assurantdha'),
(70, 'Assurant', 'medical', 'Assurant DHA Premier', 'assurant-assurantdhapremier'),
(71, 'Aultcare', 'medical', 'Aultcare PPO', 'aultcare-aultcareppo'),
(72, 'BCBS Blue Card', 'medical', 'BCBS Blue Card PPO', 'bcbsbluecard-bcbsbluecardppo'),
(73, 'BCBS Minnesota', 'medical', 'BCBS MN Blue Cross Accord', 'bcbsminnesota-bcbsmnbluecrossaccord'),
(74, 'Blue Cross Blue Sheild of Alabama', 'medical', 'BCBS AL PPO', 'bluecrossbluesheildofalabama-bcbsalppo'),
(75, 'Blue Cross Blue Sheild of Alabama', 'dental', 'BCBS AL Preferred Dentists', 'bluecrossbluesheildofalabama-bcbsalpreferreddentists'),
(76, 'Blue Cross Blue Shield of Aritona', 'medical', 'BCBS AZ Alliance', 'bluecrossblueshieldofaritona-bcbsazalliance'),
(77, 'Blue Cross Blue Shield of Florida', 'dental', 'FL Blue BlueDental Choice  Choice Plus PPO', 'bluecrossblueshieldofflorida-flbluebluedentalchoicechoiceplusppo'),
(78, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue BlueCare HMO', 'bluecrossblueshieldofflorida-floridabluebluecarehmo'),
(79, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue BlueOptions', 'bluecrossblueshieldofflorida-floridablueblueoptions'),
(80, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue BlueSelect', 'bluecrossblueshieldofflorida-floridablueblueselect'),
(81, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue NetworkBlue', 'bluecrossblueshieldofflorida-floridabluenetworkblue'),
(82, 'Blue Cross Blue Shield of Florida BCBSFL', 'medical', 'Florida Blue - BlueOptions - HIX', 'bcbsflorida-floridablueblueoptionshix'),
(83, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Blue Choice HMO', 'bluecrossblueshieldofgeorgia-bcbsgabluechoicehmo'),
(84, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Blue Choice PPO', 'bluecrossblueshieldofgeorgia-bcbsgabluechoiceppo'),
(85, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Blue Open Access POS', 'bluecrossblueshieldofgeorgia-bcbsgablueopenaccesspos'),
(86, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA BlueChoice Option POS', 'bluecrossblueshieldofgeorgia-bcbsgabluechoiceoptionpos'),
(87, 'Blue Cross Blue Shield of Georgia', 'dental', 'BCBS GA Dental Complete', 'bluecrossblueshieldofgeorgia-bcbsgadentalcomplete'),
(88, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Direct Access wHSA', 'bluecrossblueshieldofgeorgia-bcbsgadirectaccesswhsa'),
(89, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL Blue Advantage HMO', 'bluecrossblueshieldofillinois-bcbsilblueadvantagehmo'),
(90, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL Blue Precision HMO', 'bluecrossblueshieldofillinois-bcbsilblueprecisionhmo'),
(91, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL BlueChoice Select', 'bluecrossblueshieldofillinois-bcbsilbluechoiceselect'),
(92, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL HMO Illinois', 'bluecrossblueshieldofillinois-bcbsilhmoillinois'),
(93, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL PPO', 'bluecrossblueshieldofillinois-bcbsilppo'),
(94, 'Blue Cross Blue Shield of Kansas City', 'medical', 'BCBS KC Preferred-Care Blue PPO', 'bluecrossblueshieldofkansascity-bcbskcpreferredcareblueppo'),
(95, 'Blue Cross Blue Shield of Louisiana', 'dental', 'BCBS LA Blue Cross Dental Network', 'bluecrossblueshieldoflouisiana-bcbslabluecrossdentalnetwork'),
(96, 'Blue Cross Blue Shield of Louisiana', 'medical', 'BCBS LA BlueConnect HMOPOS', 'bluecrossblueshieldoflouisiana-bcbslablueconnecthmopos'),
(97, 'Blue Cross Blue Shield of Louisiana', 'medical', 'BCBS LA Community Blue HMOPOS', 'bluecrossblueshieldoflouisiana-bcbslacommunitybluehmopos'),
(98, 'Blue Cross Blue Shield of Massachusetts', 'medical', 'BCBS MA Blue Care Elect PPO', 'bluecrossblueshieldofmassachusetts-bcbsmabluecareelectppo'),
(99, 'Blue Cross Blue Shield of Massachusetts', 'medical', 'BCBS MA HMO Blue with Managed Care Behavioral Health', 'bluecrossblueshieldofmassachusetts-bcbsmahmobluewithmanagedcarebehavioralhealth'),
(100, 'Blue Cross Blue Shield of Massachusetts', 'medical', 'BCBS MA Preferred Blue PPO', 'bluecrossblueshieldofmassachusetts-bcbsmapreferredblueppo'),
(101, 'Blue Cross Blue Shield of Michigan', 'medical', 'BCBS MI Blue Care Network', 'bluecrossblueshieldofmichigan-bcbsmibluecarenetwork'),
(102, 'Blue Cross Blue Shield of Michigan', 'medical', 'BCBS MI Blue Care Network PCP Focus Network', 'bluecrossblueshieldofmichigan-bcbsmibluecarenetworkpcpfocusnetwork'),
(103, 'Blue Cross Blue Shield of Michigan', 'medical', 'BCBS MI PPO Plans - Group Employees', 'bluecrossblueshieldofmichigan-bcbsmippoplansgroupemployees'),
(104, 'Blue Cross Blue Shield of New Mexico', 'medical', 'BCBS NM PPO NM', 'bluecrossblueshieldofnewmexico-bcbsnmpponm'),
(105, 'Blue Cross Blue Shield of Oklahoma', 'medical', 'BCBS OK BlueChoice', 'bluecrossblueshieldofoklahoma-bcbsokbluechoice'),
(106, 'Blue Cross Blue Shield of Rhode Island', 'medical', 'BCBS RI HealthMate Coast-to-Coast', 'bluecrossblueshieldofrhodeisland-bcbsrihealthmatecoasttocoast'),
(107, 'Blue Cross Blue Shield of TX', 'dental', 'BCBS TX BlueCare Dental', 'bluecrossblueshieldoftx-bcbstxbluecaredental'),
(108, 'Blue Cross Blue Shield of TX', 'dental', 'BCBS TX DentaBlue', 'bluecrossblueshieldoftx-bcbstxdentablue'),
(109, 'Blue Cross Blue Shield of Tennessee', 'medical', 'BCBS TN Blue Network E', 'bluecrossblueshieldoftennessee-bcbstnbluenetworke'),
(110, 'Blue Cross Blue Shield of Tennessee', 'medical', 'BCBS TN Network S', 'bluecrossblueshieldoftennessee-bcbstnnetworks'),
(111, 'Blue Cross Blue Shield of Texas', 'medical', 'BCBS NC BlueOptions Group PPO', 'bluecrossblueshieldoftexas-bcbsncblueoptionsgroupppo'),
(112, 'Blue Cross Blue Shield of Texas', 'medical', 'BCBS TX Blue Advantage HMO', 'bluecrossblueshieldoftexas-bcbstxblueadvantagehmo'),
(113, 'Blue Cross Blue Shield of Texas', 'medical', 'BCBS TX BlueChoice', 'bluecrossblueshieldoftexas-bcbstxbluechoice'),
(114, 'Blue Cross Blue Shield of Texas BCBSTX', 'medical', 'Blue Advantage - HMO - HIX', 'bcbstexas-bcbstxblueadvantagehmohix'),
(115, 'Blue Cross Blue Shield of Wyoming', 'medical', 'BCBS WY BlueChoice Personal', 'bluecrossblueshieldofwyoming-bcbswybluechoicepersonal'),
(116, 'Blue Cross Idaho', 'medical', 'Blue Cross ID PPO', 'bluecrossidaho-bluecrossidppo'),
(117, 'Blue Shield of California', 'dental', 'BS CA Dental PPO', 'blueshieldofcalifornia-bscadentalppo'),
(118, 'Blue Shield of California', 'medical', 'BS CA Platinum 90 EPO', 'blueshieldofcalifornia-bscaplatinum90epo'),
(119, 'Blue Shield of California', 'medical', 'BS CA Trio ACO HMO', 'blueshieldofcalifornia-bscatrioacohmo'),
(120, 'Blue Shield of California', 'medical', 'Basic EPO - Bronze level HIX', 'blueshieldofcalifornia-blueshieldcabasicepobronzelevelhix'),
(121, 'Blue Shield of California', 'medical', 'Basic PPO - Bronze level HIX', 'blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix'),
(122, 'Blue Shield of California', 'medical', 'Blue Shield CA Access Plus HMO', 'blueshieldofcalifornia-blueshieldcaaccessplushmo'),
(123, 'Blue Shield of California', 'medical', 'Blue Shield CA Access Plus Savenet', 'blueshieldofcalifornia-blueshieldcaaccessplussavenet'),
(124, 'Blue Shield of California', 'medical', 'Blue Shield CA Basic EPO', 'blueshieldofcalifornia-blueshieldcabasicepo'),
(125, 'Blue Shield of California', 'medical', 'Blue Shield CA Basic Exclusive PPO for Small Business', 'blueshieldofcalifornia-blueshieldcabasicexclusiveppoforsmallbusiness'),
(126, 'Blue Shield of California', 'medical', 'Blue Shield CA Basic PPO', 'blueshieldofcalifornia-blueshieldcabasicppo'),
(127, 'Blue Shield of California', 'medical', 'Blue Shield CA Enhanced Exclusive HMO for Small Business', 'blueshieldofcalifornia-blueshieldcaenhancedexclusivehmoforsmallbusiness'),
(128, 'Blue Shield of California', 'medical', 'Blue Shield CA Local Access Plus HMO', 'blueshieldofcalifornia-blueshieldcalocalaccessplushmo'),
(129, 'Blue Shield of California', 'medical', 'Blue Shield CA PPO', 'blueshieldofcalifornia-blueshieldcappo'),
(130, 'Bluegrass Family Health', 'medical', 'Bluegrass Family Health PPO', 'bluegrassfamilyhealth-bluegrassfamilyhealthppo'),
(131, 'Bridgespan', 'medical', 'Bridgespan - HIX', 'bridgespan-bridgespanhix'),
(132, 'Buckeye Community Health Plan', 'medical', 'Ambetter from Buckeye Community Health Plan HIX', 'buckeyecommunityhealthplan-ambetterfrombuckeyecommunityhealthplanhix'),
(133, 'Capital Blue Cross', 'medical', 'Capital BC Keystone Health Plan Central HMO', 'capitalbluecross-capitalbckeystonehealthplancentralhmo'),
(134, 'Capital Blue Cross', 'medical', 'Capital BC PPO', 'capitalbluecross-capitalbcppo'),
(135, 'Capital District Physicians Health Plan', 'medical', 'CDPHP HMO', 'capitaldistrictphysicianshealthplan-cdphphmo'),
(136, 'Capital District Physicians Health Plan', 'medical', 'CDPHP PPO', 'capitaldistrictphysicianshealthplan-cdphpppo'),
(137, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst BlueChoice Advantage', 'carefirstbluecrossblueshield-carefirstbluechoiceadvantage'),
(138, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst BlueChoice Ntwk POS', 'carefirstbluecrossblueshield-carefirstbluechoicentwkpos'),
(139, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst BluePreferred PPO', 'carefirstbluecrossblueshield-carefirstbluepreferredppo'),
(140, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst Maryland POS', 'carefirstbluecrossblueshield-carefirstmarylandpos'),
(141, 'Care First Blue Cross Blue Shield', 'dental', 'CareFirst Regional Preferred Dental PPO', 'carefirstbluecrossblueshield-carefirstregionalpreferreddentalppo'),
(142, 'Care First Blue Cross Blue Shield', 'dental', 'CareFirst Regional Traditional Dental', 'carefirstbluecrossblueshield-carefirstregionaltraditionaldental'),
(143, 'Chinese Community Health Plan', 'medical', 'Chinese Community Health Plan', 'chinesecommunityhealthplan-chinesecommunityhealthplan'),
(144, 'Cigna', 'medical', 'CIGNA HMO', 'cigna-cignahmo'),
(145, 'Cigna', 'medical', 'CIGNA LocalPlus', 'cigna-cignalocalplus'),
(146, 'Cigna', 'medical', 'CIGNA Open Access Plus', 'cigna-cignaopenaccessplus'),
(147, 'Cigna', 'medical', 'CIGNA PPO', 'cigna-cignappo'),
(148, 'Cigna', 'vision', 'Vision', 'cigna-vision'),
(149, 'Cigna Dental', 'dental', 'CIGNA Dental DHMO', 'cignadental-cignadentaldhmo'),
(150, 'Cigna Dental', 'dental', 'CIGNA Total DPPO', 'cignadental-cignatotaldppo'),
(151, 'Cofinity', 'medical', 'Cofinity PPO', 'cofinity-cofinityppo'),
(152, 'CommUnityCare Health Centers', 'medical', 'CommunityCare PPO Standard Network', 'communitycarehealthcenters-communitycareppostandardnetwork'),
(153, 'CommUnityCare Health Centers', 'medical', 'CommunityCare Plus POS Standard Network', 'communitycarehealthcenters-communitycareplusposstandardnetwork'),
(154, 'CompBenefits Corporation', 'medical', 'CompBenefits AdvantagePlus Plans', 'compbenefitscorporation-compbenefitsadvantageplusplans'),
(155, 'CompBenefits Corporation', 'dental', 'CompBenefits Dental Access Plan', 'compbenefitscorporation-compbenefitsdentalaccessplan'),
(156, 'CompBenefits Corporation', 'medical', 'CompBenefits PPO', 'compbenefitscorporation-compbenefitsppo'),
(157, 'Connecticare', 'medical', 'Connecticare FlexPOS', 'connecticare-connecticareflexpos'),
(158, 'Connecticare', 'medical', 'Connecticare HMO Open Access', 'connecticare-connecticarehmoopenaccess'),
(159, 'Coventry Health Care', 'medical', 'CareLink PPO - WV', 'coventryhealthcare-carelinkppowv'),
(160, 'Coventry Health Care', 'medical', 'Coventry Carelink - HMO  HIX', 'coventryhealthcare-coventrycarelinkhmohix'),
(161, 'Coventry Health Care', 'medical', 'Coventry Carelink HMO FL', 'coventryhealthcare-coventrycarelinkhmofl'),
(162, 'Coventry Health Care', 'medical', 'Coventry Employer Group HMOOpen Access - FL', 'coventryhealthcare-coventryemployergrouphmoopenaccessfl'),
(163, 'Coventry Health Care', 'medical', 'Coventry Employer Group PPO - FL', 'coventryhealthcare-coventryemployergroupppofl'),
(164, 'Coventry Health Care', 'medical', 'Coventry Freedom PPO - OK', 'coventryhealthcare-coventryfreedomppook'),
(165, 'Coventry Health Care', 'medical', 'Coventry Health  Life IL - PPO', 'coventryhealthcare-coventryhealthlifeilppo'),
(166, 'Coventry Health Care', 'medical', 'Coventry Health Care of Nevada PPO', 'coventryhealthcare-coventryhealthcareofnevadappo'),
(167, 'Coventry Health Care', 'medical', 'Coventry Health Care of VA HMO', 'coventryhealthcare-coventryhealthcareofvahmo'),
(168, 'Coventry Health Care', 'medical', 'Coventry HealthAmerica HMO', 'coventryhealthcare-coventryhealthamericahmo'),
(169, 'Coventry Health Care', 'medical', 'Coventry HealthAmerica PPO', 'coventryhealthcare-coventryhealthamericappo'),
(170, 'Coventry Health Care', 'medical', 'Coventry IA - PPO', 'coventryhealthcare-coventryiappo'),
(171, 'Coventry Health Care', 'medical', 'Coventry IL - PPO', 'coventryhealthcare-coventryilppo'),
(172, 'Coventry Health Care', 'medical', 'Coventry IL - PPO Platinum', 'coventryhealthcare-coventryilppoplatinum'),
(173, 'Coventry Health Care', 'medical', 'Coventry KS - PPO', 'coventryhealthcare-coventryksppo'),
(174, 'Coventry Health Care', 'medical', 'Coventry Life  Health OK', 'coventryhealthcare-coventrylifehealthok'),
(175, 'Coventry Health Care', 'medical', 'Coventry MO - HMOPOS', 'coventryhealthcare-coventrymohmopos'),
(176, 'Coventry Health Care', 'medical', 'Coventry MO - PPO', 'coventryhealthcare-coventrymoppo'),
(177, 'Coventry Health Care', 'medical', 'Coventry NE - PPO', 'coventryhealthcare-coventryneppo'),
(178, 'Coventry Health Care', 'medical', 'Coventry PPO - DE', 'coventryhealthcare-coventryppode'),
(179, 'Coventry Health Care', 'medical', 'Coventry PPO - TN', 'coventryhealthcare-coventryppotn'),
(180, 'Coventry Health Care', 'medical', 'Coventry Southern Health PPO', 'coventryhealthcare-coventrysouthernhealthppo'),
(181, 'Coventry Health Care', 'medical', 'Coventry UT Peak Advantage', 'coventryhealthcare-coventryutpeakadvantage'),
(182, 'Coventry Health Care', 'medical', 'Coventry Wellpath Preferred PPO', 'coventryhealthcare-coventrywellpathpreferredppo'),
(183, 'Coventry Health Care', 'medical', 'CoventryOne - HMO  HIX', 'coventryhealthcare-coventryonehmohix'),
(184, 'Coventry Health Care', 'medical', 'CoventryOne HMO', 'coventryhealthcare-coventryonehmo'),
(185, 'Delta Dental', 'dental', 'Delta Dental DeltaCare USA', 'deltadental-deltadentaldeltacareusa'),
(186, 'Delta Dental', 'dental', 'Delta Dental PPO', 'deltadental-deltadentalppo'),
(187, 'Delta Dental', 'dental', 'Delta Dental Premier', 'deltadental-deltadentalpremier'),
(188, 'Dental Network of America', 'dental', 'Dental Network of America DPPO', 'dentalnetworkofamerica-dentalnetworkofamericadppo'),
(189, 'DenteMax', 'dental', 'DenteMax Dental', 'dentemax-dentemaxdental'),
(190, 'Diversified Dental', 'dental', 'Diversified Dental PPO', 'diversifieddental-diversifieddentalppo'),
(191, 'Dominion Group', 'dental', 'Dominion Dental PPO', 'dominiongroup-dominiondentalppo'),
(192, 'Emblem Health', 'dental', 'Emblem Dental - Preferred Plus', 'emblemhealth-emblemdentalpreferredplus'),
(193, 'Emblem Health', 'medical', 'EmblemHealth PPO GHI', 'emblemhealth-emblemhealthppoghi'),
(194, 'Empire BCBS', 'medical', 'Empire HMO', 'empirebcbs-empirehmo'),
(195, 'Empire BCBS', 'medical', 'Empire PPO', 'empirebcbs-empireppo'),
(196, 'Empire BCBS', 'medical', 'Empire Pathway Enhanced Guided Access', 'empirebcbs-empirepathwayenhancedguidedaccess'),
(197, 'Empire BCBS', 'medical', 'Empire Prism EPO - Blue Priority', 'empirebcbs-empireprismepobluepriority'),
(198, 'Excellus BCBS', 'medical', 'Excellus BluePPO', 'excellusbcbs-excellusblueppo'),
(199, 'Excellus BCBS', 'medical', 'Excellus HMOBlue', 'excellusbcbs-excellushmoblue'),
(200, 'First Choice', 'medical', 'First Choice', 'firstchoice-firstchoice'),
(201, 'First Dental Health', 'dental', 'First Dental Health', 'firstdentalhealth-firstdentalhealth'),
(202, 'First Health Coventry Healthcare', 'medical', 'First Health PPO', 'firsthealthcoventryhealthcare-firsthealthppo'),
(203, 'GWH-Cigna', 'medical', 'Great West PPO', 'gwhcigna-greatwestppo'),
(204, 'Geisinger Health Plan', 'medical', 'Geisinger Health Plan', 'geisingerhealthplan-geisingerhealthplan'),
(205, 'Group Health Cooperative', 'medical', 'Group Health Coop Alliant PlusConnect', 'grouphealthcooperative-grouphealthcoopalliantplusconnect'),
(206, 'Group Health Cooperative', 'medical', 'Group Health Coop Core', 'grouphealthcooperative-grouphealthcoopcore'),
(207, 'Guardian Dental', 'dental', 'Guardian DentalGuard Preferred', 'guardiandental-guardiandentalguardpreferred'),
(208, 'Guardian Dental', 'dental', 'Guardian Managed Dental Care', 'guardiandental-guardianmanageddentalcare'),
(209, 'Guardian Dental', 'dental', 'Guardian Managed DentalGuard', 'guardiandental-guardianmanageddentalguard'),
(210, 'Gundersen Health Plan', 'medical', 'Gundersen Health Plan Select Network', 'gundersenhealthplan-gundersenhealthplanselectnetwork'),
(211, 'HAP', 'medical', 'HAP PPO', 'hap-happpo'),
(212, 'HAP', 'medical', 'HAP Preferred PPO', 'hap-happreferredppo'),
(213, 'HIP of NY', 'medical', 'Emblem HIP Select PPO', 'hipofny-emblemhipselectppo'),
(214, 'HMSA', 'medical', 'HMSA Preferred ProviderComp Med', 'hmsa-hmsapreferredprovidercompmed'),
(215, 'Harvard Pilgrim', 'medical', 'Harvard Pilgrim PPO', 'harvardpilgrim-harvardpilgrimppo'),
(216, 'Health Alliance', 'medical', 'Health Alliance HMOPOS', 'healthalliance-healthalliancehmopos'),
(217, 'Health Alliance', 'medical', 'Health Alliance PPO', 'healthalliance-healthallianceppo'),
(218, 'Health Plan of Nevada', 'medical', 'Health Plan of NV HMO - Northern NV', 'healthplanofnevada-healthplanofnvhmonorthernnv'),
(219, 'Health Plan of Nevada', 'medical', 'Health Plan of NV HMO - Rural NV', 'healthplanofnevada-healthplanofnvhmoruralnv'),
(220, 'Health Plan of Nevada', 'medical', 'Health Plan of NV HMO - Southern NV', 'healthplanofnevada-healthplanofnvhmosouthernnv'),
(221, 'HealthFirst NY', 'medical', 'Healthfirst NY HMO ABCD', 'healthfirstny-healthfirstnyhmoabcd'),
(222, 'HealthLink', 'medical', 'HealthLink PPO', 'healthlink-healthlinkppo'),
(223, 'HealthNet', 'medical', 'Blue  Gold - HMO', 'healthnet-bluegoldhmo'),
(224, 'HealthNet', 'medical', 'HMO - ExcelCare  Silver Network', 'healthnet-hmoexcelcaresilvernetwork'),
(225, 'HealthNet', 'medical', 'HMO - ExcelCare  Silver Network Medicare COB', 'healthnet-hmoexcelcaresilvernetworkmedicarecob'),
(226, 'HealthNet', 'medical', 'Health Net AZ HMO ExcelCare Network', 'healthnet-healthnetazhmoexcelcarenetwork'),
(227, 'HealthNet', 'medical', 'Health Net AZ PPOPOS', 'healthnet-healthnetazppopos'),
(228, 'HealthNet', 'medical', 'Health Net CA Blue  Gold HMO', 'healthnet-healthnetcabluegoldhmo'),
(229, 'HealthNet', 'medical', 'Health Net CA CommunityCare Network HMO', 'healthnet-healthnetcacommunitycarenetworkhmo'),
(230, 'HealthNet', 'medical', 'Health Net CA Covered California PPO - Small Group', 'healthnet-healthnetcacoveredcaliforniapposmallgroup'),
(231, 'HealthNet', 'medical', 'Health Net CA HMO Employer Group', 'healthnet-healthnetcahmoemployergroup'),
(232, 'HealthNet', 'medical', 'Health Net CA HMO SmartCare', 'healthnet-healthnetcahmosmartcare'),
(233, 'HealthNet', 'medical', 'Health Net CA HMO Whole Care Network', 'healthnet-healthnetcahmowholecarenetwork'),
(234, 'HealthNet', 'medical', 'Health Net CA Individual  Family PPO', 'healthnet-healthnetcaindividualfamilyppo'),
(235, 'HealthNet', 'medical', 'Health Net CA Large Group PPO', 'healthnet-healthnetcalargegroupppo'),
(236, 'HealthNet', 'medical', 'Health Net CA Primary EPO', 'healthnet-healthnetcaprimaryepo'),
(237, 'HealthNet', 'medical', 'Health Net CommunityCare Network - HMO  HIX', 'healthnet-healthnetcommunitycarenetworkhmohix'),
(238, 'HealthNet', 'medical', 'Health Net Individual  Family - PPO  HIX', 'healthnet-healthnetindividualfamilyppohix'),
(239, 'HealthNet', 'medical', 'Health Net OR CommunityCare', 'healthnet-healthnetorcommunitycare'),
(240, 'HealthNet', 'medical', 'Health Net OR PPO', 'healthnet-healthnetorppo'),
(241, 'HealthNow', 'medical', 'HealthNow PPO', 'healthnow-healthnowppo'),
(242, 'HealthPlus of Michigan', 'medical', 'HealthPlus HMO', 'healthplusofmichigan-healthplushmo'),
(243, 'HealthSpan', 'medical', 'HealthSpan Access PPO', 'healthspan-healthspanaccessppo'),
(244, 'Highmark Blue Cross Blue Shield', 'medical', 'Highmark Community Blue PPO', 'highmarkbluecrossblueshield-highmarkcommunityblueppo'),
(245, 'Highmark Blue Cross Blue Shield', 'medical', 'Highmark PPOBlue', 'highmarkbluecrossblueshield-highmarkppoblue'),
(246, 'Home State Health Plan', 'medical', 'Homestate Health Plan', 'homestatehealthplan-homestatehealthplan'),
(247, 'Horizon BCBS', 'medical', 'Horizon Advance EPO', 'horizonbcbs-horizonadvanceepo'),
(248, 'Horizon BCBS', 'dental', 'Horizon Dental PPO', 'horizonbcbs-horizondentalppo'),
(249, 'Horizon BCBS', 'medical', 'Horizon Direct Access', 'horizonbcbs-horizondirectaccess'),
(250, 'Horizon BCBS', 'medical', 'Horizon HMO', 'horizonbcbs-horizonhmo'),
(251, 'Horizon BCBS', 'medical', 'Horizon POS', 'horizonbcbs-horizonpos'),
(252, 'Horizon BCBS', 'medical', 'Horizon PPO', 'horizonbcbs-horizonppo'),
(253, 'Humana', 'medical', 'Atlanta - HMOx HIX', 'humana-humanaatlantahmoxhix'),
(254, 'Humana', 'medical', 'Austin - HMOx HIX', 'humana-humanaaustinhmoxhix'),
(255, 'Humana', 'medical', 'Colorado - HMOx  HIX', 'humana-humanacohmoxhix'),
(256, 'Humana', 'medical', 'Columbus Georgia - HMOx HIX', 'humana-humanacolumbusgahmoxhix'),
(257, 'Humana', 'medical', 'HMO - Premier HIX', 'humana-humanahmopremierhix'),
(258, 'Humana', 'medical', 'Humana Atlanta HMOx', 'humana-humanaatlantahmox'),
(259, 'Humana', 'medical', 'Humana ChoiceCare Network PPO', 'humana-humanachoicecarenetworkppo'),
(260, 'Humana', 'medical', 'Humana Columbus GA HMOx', 'humana-humanacolumbusgahmox'),
(261, 'Humana', 'dental', 'Humana Dental PPO', 'humana-humanadentalppo'),
(262, 'Humana', 'medical', 'Humana Gold Plus HMO', 'humana-humanagoldplushmo'),
(263, 'Humana', 'medical', 'Humana HMO Select', 'humana-humanahmoselect'),
(264, 'Humana', 'medical', 'Humana Houston HMOx', 'humana-humanahoustonhmox'),
(265, 'Humana', 'medical', 'Humana Phoenix HMOx', 'humana-humanaphoenixhmox'),
(266, 'Humana', 'medical', 'Humana Preferred PPO', 'humana-humanapreferredppo'),
(267, 'Humana', 'medical', 'Humana South Florida HUMx HMOx', 'humana-humanasouthfloridahumxhmox'),
(268, 'Humana', 'medical', 'Humana Tampa Bay CoreNet', 'humana-humanatampabaycorenet'),
(269, 'Humana', 'medical', 'Humana Tampa Bay HUMx HMOx', 'humana-humanatampabayhumxhmox'),
(270, 'Humana', 'medical', 'Humana Tucson HMOx', 'humana-humanatucsonhmox'),
(271, 'Humana', 'medical', 'Rio Grande - EPOx HIX', 'humana-humanariograndeepoxhix'),
(272, 'Humana', 'medical', 'San Antonio - HMOx HIX', 'humana-humanasanantoniohmoxhix'),
(273, 'Humana', 'medical', 'South Florida - HUMx HMOx HIX', 'humana-humanasouthfloridahumxhmoxhix'),
(274, 'Humana', 'medical', 'Tampa Bay - HUMx HMOx HIX', 'humana-humanatampabayhumxhmoxhix'),
(275, 'Humana', 'medical', 'Waco - HMOx HIX', 'humana-humanawacohmoxhix'),
(276, 'IBC  Amerihealth', 'medical', 'AmeriHealth Local Value Network - EPO POS PPO HIX', 'ibcamerihealth-amerihealthlocalvaluenetworkepoposppohix'),
(277, 'IBC  Amerihealth', 'medical', 'AmeriHealth Local Value Network - HMO HMO POS HIX', 'ibcamerihealth-amerihealthlocalvaluenetworkhmohmoposhix'),
(278, 'IBC  Amerihealth', 'medical', 'AmeriHealth Regional Pref Network - EPO POS PPO HIX', 'ibcamerihealth-amerihealthregionalprefntwkepoposppohix'),
(279, 'IBC  Amerihealth', 'medical', 'AmeriHealth Regional Pref Network - HMO HMO POS HIX', 'ibcamerihealth-amerihealthregionalprefntwkhmohmoposhix'),
(280, 'Independence Blue Cross', 'medical', 'IBC Keystone HMO  POS', 'independencebluecross-ibckeystonehmopos'),
(281, 'Independence Blue Cross', 'medical', 'IBC Personal Choice PPO', 'independencebluecross-ibcpersonalchoiceppo'),
(282, 'Independent Health Association', 'medical', 'Independent Health Encompass HMO', 'independenthealthassociation-independenthealthencompasshmo'),
(283, 'Independent Health Association', 'medical', 'Independent Health FlexFit HMO', 'independenthealthassociation-independenthealthflexfithmo'),
(284, 'Kaiser - MidAtlantic', 'medical', 'Kaiser Permanente Mid-Atlantic', 'kaisermidatlantic-kaiserpermanentemidatlantic'),
(285, 'Kaiser Permanente', 'medical', 'Kaiser Permanente', 'kaiserpermanente-kaiserpermanente'),
(286, 'L.A. Care Health', 'medical', 'LACare', 'lacarehealth-lacare'),
(287, 'L.A. Care Health', 'medical', 'LACare Covered - HIX', 'lacarehealth-lacarecoveredhix'),
(288, 'Liberty Dental Plan', 'dental', 'Liberty Dental CA Independence PPO', 'libertydentalplan-libertydentalcaindependenceppo'),
(289, 'Lifewise health Plan of Oregon', 'medical', 'Lifewise Health Plan of Oregon', 'lifewisehealthplanoforegon-lifewisehealthplanoforegon'),
(290, 'MHS Indiana', 'medical', 'Ambetter from MHS HIX', 'mhsindiana-ambetterfrommhshix'),
(291, 'MHealth Insured', 'medical', 'MHealth Insured', 'mhealthinsured-mhealthinsured'),
(292, 'MVP Health Plan', 'medical', 'MVP HMO', 'mvphealthplan-mvphmo'),
(293, 'MVP Health Plan', 'medical', 'MVP Preferred PPO', 'mvphealthplan-mvppreferredppo'),
(294, 'Magnacare', 'medical', 'Extra Health Republic - HIX', 'magnacare-magnacareextrahealthrepublichix'),
(295, 'Magnacare', 'medical', 'MagnaCare PPO', 'magnacare-magnacareppo'),
(296, 'Medicaid', 'medical', 'Medicaid', 'medicaid-medicaid'),
(297, 'Medical Mutual of Ohio', 'medical', 'MMOH SuperMed POS', 'medicalmutualofohio-mmohsupermedpos'),
(298, 'Medical Mutual of Ohio', 'medical', 'MMOH SuperMed Plus', 'medicalmutualofohio-mmohsupermedplus'),
(299, 'Medicare', 'medical', 'Medicare', 'medicare-medicare'),
(300, 'MetLife', 'medical', 'MetLife HMO', 'metlife-metlifehmo'),
(301, 'MetLife', 'dental', 'MetLife PDP', 'metlife-metlifepdp'),
(302, 'Molina Healthcare', 'medical', 'Molina Marketplace - California - HIX', 'molinahealthcare-molinamrktplacecahix'),
(303, 'Molina Healthcare', 'medical', 'Molina Mrktplace CA', 'molinahealthcare-molinamrktplaceca'),
(304, 'Multiplan', 'medical', 'Multiplan PPO', 'multiplan-multiplanppo'),
(305, 'Multiplan', 'medical', 'PHCS PPO', 'multiplan-phcsppo'),
(306, 'Multiplan', 'medical', 'PHCS PPO - Kaiser', 'multiplan-phcsppokaiser'),
(307, 'ODS Health Plan', 'medical', 'ODS Network', 'odshealthplan-odsnetwork'),
(308, 'Oxford Health', 'medical', 'Oxford Freedom', 'oxfordhealth-oxfordfreedom'),
(309, 'Oxford Health', 'medical', 'Oxford Liberty', 'oxfordhealth-oxfordliberty'),
(310, 'PacificSource Health Plans', 'medical', 'PacificSource Preferred PSN', 'pacificsourcehealthplans-pacificsourcepreferredpsn'),
(311, 'Paramount', 'medical', 'Paramount Ohio HMO PICO', 'paramount-paramountohiohmopico'),
(312, 'Premera Blue Cross', 'medical', 'Premera Heritage  Heritage Plus 1', 'premerabluecross-premeraheritageheritageplus1'),
(313, 'Premera Blue Cross', 'medical', 'Premera Heritage Signature', 'premerabluecross-premeraheritagesignature'),
(314, 'Premera Blue Cross', 'medical', 'Premera LifeWise Connect', 'premerabluecross-premeralifewiseconnect'),
(315, 'Premera Blue Cross Blue Shield', 'medical', 'LifeWise Connect - HIX', 'premerabcbs-lifewiseconnecthix'),
(316, 'Premera Blue Cross Blue Shield', 'medical', 'Premera Heritage Signature - HIX', 'premerabcbs-premeraheritagesignaturehix'),
(317, 'Presbyterian Healthcare Services', 'medical', 'Presbyterian Commercial', 'presbyterianhealthcareservices-presbyteriancommercial'),
(318, 'Principal Financial Services', 'dental', 'Principal Dental PPO', 'principalfinancialservices-principaldentalppo'),
(319, 'PriorityHealth', 'medical', 'PriorityHealth HMO', 'priorityhealth-priorityhealthhmo'),
(320, 'PriorityHealth', 'medical', 'PriorityHealth Priority PPO', 'priorityhealth-priorityhealthpriorityppo'),
(321, 'Providence Health System', 'medical', 'Providence Personal Option', 'providencehealthsystem-providencepersonaloption'),
(322, 'Providence Health System', 'medical', 'Providence Preferred PPO', 'providencehealthsystem-providencepreferredppo'),
(323, 'QualCare', 'medical', 'QualCare HMO', 'qualcare-qualcarehmo'),
(324, 'QualCare', 'medical', 'QualCare PPO', 'qualcare-qualcareppo'),
(325, 'Qualchoice', 'medical', 'Qualchoice PPO', 'qualchoice-qualchoiceppo'),
(326, 'Regence Blue Cross Blue Shield of Oregon', 'medical', 'Regence OR Preferred Provider Network', 'regencebluecrossblueshieldoforegon-regenceorpreferredprovidernetwork'),
(327, 'Regence Blue Cross Blue Shield of Utah', 'dental', 'Regence ValueCare', 'regencebluecrossblueshieldofutah-regencevaluecare'),
(328, 'Regence Blue Shield of Idaho', 'medical', 'Regence ID Preferred Provider Network', 'regenceblueshieldofidaho-regenceidpreferredprovidernetwork'),
(329, 'Regence Blue Shield of Washinton', 'medical', 'Regence WA Preferred Provider Network', 'regenceblueshieldofwashinton-regencewapreferredprovidernetwork'),
(330, 'Rocky Mountain Health Plans', 'medical', 'Rocky Mountain Summit Group', 'rockymountainhealthplans-rockymountainsummitgroup'),
(331, 'Sagamore Health Network', 'medical', 'Sagamore Plus', 'sagamorehealthnetwork-sagamoreplus'),
(332, 'Scion Dental', 'dental', 'Scion Dental', 'sciondental-sciondental'),
(333, 'Scott and White', 'medical', 'Scott and White PPO', 'scottandwhite-scottandwhiteppo'),
(334, 'Sharp Health Plan', 'medical', 'Sharp Blue Choice', 'sharphealthplan-sharpbluechoice'),
(335, 'Sharp Health Plan', 'medical', 'Sharp Gold Value', 'sharphealthplan-sharpgoldvalue'),
(336, 'Sharp Health Plan', 'medical', 'Sharp Health Performance', 'sharphealthplan-sharphealthperformance'),
(337, 'Sharp Health Plan', 'medical', 'Sharp Health Performance - HIX', 'sharphealthplan-sharphealthperformancehix'),
(338, 'Sharp Health Plan', 'medical', 'Sharp Health Premier', 'sharphealthplan-sharphealthpremier'),
(339, 'Sharp Health Plan', 'medical', 'Sharp Health Premier - HIX', 'sharphealthplan-sharphealthpremierhix'),
(340, 'Sierra Health', 'medical', 'Sierra Health Northern Nevada PPO', 'sierrahealth-sierrahealthnorthernnevadappo'),
(341, 'Sierra Health', 'medical', 'Sierra Health Southern Nevada PPO', 'sierrahealth-sierrahealthsouthernnevadappo'),
(342, 'Spectrum Health', 'medical', 'Spectrum Health', 'spectrumhealth-spectrumhealth'),
(343, 'Total Dental Administrators', 'dental', 'Total Dental Administrators PPO', 'totaldentaladministrators-totaldentaladministratorsppo'),
(344, 'Total Health Plan', 'medical', 'Total Health Plan Employer Sponsored HMO', 'totalhealthplan-totalhealthplanemployersponsoredhmo'),
(345, 'Tufts Health Plan', 'medical', 'Tufts PPO', 'tuftshealthplan-tuftsppo'),
(346, 'UHC West Formerly Pacificare', 'medical', 'Pacificare HMO', 'uhcwestformerlypacificare-pacificarehmo'),
(347, 'UHC West Formerly Pacificare', 'medical', 'UHC West SignatureValue Advantage HMO Value Network', 'uhcwestformerlypacificare-uhcwestsignaturevalueadvantagehmovaluenetwork'),
(348, 'UHC West Formerly Pacificare', 'medical', 'UHC West SignatureValue Alliance', 'uhcwestformerlypacificare-uhcwestsignaturevaluealliance'),
(349, 'UHC of the River Valley', 'medical', 'Neighborhood Health Partnership - Commercial', 'uhcoftherivervalley-neighborhoodhealthpartnershipcommercial'),
(350, 'United Concordia', 'medical', 'United Concordia Advantage Plus PPO', 'unitedconcordia-unitedconcordiaadvantageplusppo'),
(351, 'United Concordia', 'dental', 'United Concordia DHMO Concordia Plus General Dentist', 'unitedconcordia-unitedconcordiadhmoconcordiaplusgeneraldentist'),
(352, 'United Concordia', 'medical', 'United Concordia National Fee-For-Service', 'unitedconcordia-unitedconcordianationalfeeforservice'),
(353, 'United Healthcare', 'medical', 'UHC Choice Plus POS', 'unitedhealthcare-uhcchoicepluspos'),
(354, 'United Healthcare', 'medical', 'UHC Medica Choice', 'unitedhealthcare-uhcmedicachoice'),
(355, 'United Healthcare', 'medical', 'UHC Navigate HMO', 'unitedhealthcare-uhcnavigatehmo'),
(356, 'United Healthcare', 'medical', 'UHC Navigate POS', 'unitedhealthcare-uhcnavigatepos'),
(357, 'United Healthcare', 'medical', 'UHC Options PPO', 'unitedhealthcare-uhcoptionsppo'),
(358, 'United Healthcare Dental', 'dental', 'United Healthcare Dental DHMO CA Only', 'unitedhealthcaredental-unitedhealthcaredentaldhmocaonly'),
(359, 'United Healthcare Dental', 'dental', 'United Healthcare Dental PPO', 'unitedhealthcaredental-unitedhealthcaredentalppo'),
(360, 'Unity Health Insurance', 'medical', 'Unity Health Ins Unity Network', 'unityhealthinsurance-unityhealthinsunitynetwork'),
(361, 'VSP', 'vision', 'VSP', 'vsp-vsp'),
(362, 'Wellmark Blue Cross and Blue Shield', 'medical', 'Wellmark Alliance Select', 'wellmarkbluecrossandblueshield-wellmarkallianceselect'),
(363, 'Western Health Advantage', 'medical', 'Western Health Advantage', 'westernhealthadvantage-westernhealthadvantage'),
(364, 'Wisconsin Physicians Service Insurance Corporation', 'medical', 'WPS', 'wisconsinphysiciansserviceinsurancecorporation-wps'),
(365, 'Advantage Health Solutions', 'medical', 'Advantage Health 360 Main', 'advantagehealthsolutions-advantagehealth360main'),
(366, 'Aetna', 'medical', 'Advantage 6350 - HIX', 'aetna-aetnaadvantage6350hix'),
(367, 'Aetna', 'medical', 'Aetna Advantage 6350', 'aetna-aetnaadvantage6350'),
(368, 'Aetna', 'medical', 'Aetna Basic HMO', 'aetna-aetnabasichmo'),
(369, 'Aetna', 'medical', 'Aetna Choice POS II', 'aetna-aetnachoiceposii'),
(370, 'Aetna', 'medical', 'Aetna Choice POS Open Access', 'aetna-aetnachoiceposopenaccess'),
(371, 'Aetna', 'medical', 'Aetna DMO', 'aetna-aetnadmo'),
(372, 'Aetna', 'dental', 'Aetna DPPO', 'aetna-aetnadppo'),
(373, 'Aetna', 'medical', 'Aetna Elect Choice EPO', 'aetna-aetnaelectchoiceepo'),
(374, 'Aetna', 'medical', 'Aetna HMO', 'aetna-aetnahmo'),
(375, 'Aetna', 'medical', 'Aetna HMO Deductible Plan CA members only', 'aetna-aetnahmodeductibleplancamembersonly'),
(376, 'Aetna', 'medical', 'Aetna Health Network Option Open Access', 'aetna-aetnahealthnetworkoptionopenaccess'),
(377, 'Aetna', 'medical', 'Aetna Managed Choice POS Open Access', 'aetna-aetnamanagedchoiceposopenaccess'),
(378, 'Aetna', 'medical', 'Aetna Savings Plus of AZ', 'aetna-aetnasavingsplusofaz'),
(379, 'Aetna', 'medical', 'Aetna Savings Plus of CA', 'aetna-aetnasavingsplusofca'),
(380, 'Aetna', 'medical', 'Aetna Select', 'aetna-aetnaselect'),
(381, 'Aetna', 'medical', 'Aetna Signature Administrators PPO', 'aetna-aetnasignatureadministratorsppo'),
(382, 'Aetna', 'medical', 'Aetna Vitalidad Plus CA con Aetna', 'aetna-aetnavitalidadpluscaconaetna'),
(383, 'Aetna', 'medical', 'Aetna Whole Health Banner Health Network HMO', 'aetna-aetnawholehealthbannerhealthnetworkhmo'),
(384, 'Aetna', 'medical', 'Aetna Whole Health Colorado Front Range', 'aetna-aetnawholehealthcoloradofrontrange'),
(385, 'Aetna', 'medical', 'Aetna Whole Health PrimeCare HMO CA', 'aetna-aetnawholehealthprimecarehmoca'),
(386, 'Aetna', 'medical', 'Aetna Whole Health PrimeCare OAMC CA', 'aetna-aetnawholehealthprimecareoamcca'),
(387, 'Aetna', 'medical', 'Basic - HIX', 'aetna-aetnabasichix'),
(388, 'Aetna', 'medical', 'MD Bronze Silver  Gold - HMO', 'aetna-aetnamdbronzesilverandgoldhmo'),
(389, 'Altius Coventry Health Care', 'medical', 'Altius Provider Directory', 'altiuscoventryhealthcare-altiusproviderdirectory'),
(390, 'Ambetter Superior Health Plan', 'medical', 'Ambetter Superior Health Plan', 'ambettersuperiorhealthplan-ambettersuperiorhealthplan'),
(391, 'Amerihealth', 'medical', 'Amerihealth Local Value Network EPO POS PPO', 'amerihealth-amerihealthlocalvaluenetworkepoposppo'),
(392, 'Amerihealth', 'medical', 'Amerihealth Local Value Network HMO HMO POS', 'amerihealth-amerihealthlocalvaluenetworkhmohmopos'),
(393, 'Amerihealth', 'medical', 'Amerihealth Regional Pref Ntwk EPO POS PPO', 'amerihealth-amerihealthregionalprefntwkepoposppo'),
(394, 'Amerihealth', 'medical', 'Amerihealth Regional Pref Ntwk HMO HMO POS', 'amerihealth-amerihealthregionalprefntwkhmohmopos'),
(395, 'Ameritas', 'medical', 'Ameritas PPO', 'ameritas-ameritasppo'),
(396, 'Anthem', 'medical', 'Anthem Blue Access PPO', 'anthem-anthemblueaccessppo'),
(397, 'Anthem', 'medical', 'Anthem Blue Open Access POS', 'anthem-anthemblueopenaccesspos'),
(398, 'Anthem', 'medical', 'Anthem Blue Preferred HMO', 'anthem-anthembluepreferredhmo'),
(399, 'Anthem', 'medical', 'Anthem Blue Preferred Plus POS', 'anthem-anthembluepreferredpluspos'),
(400, 'Anthem', 'medical', 'Anthem Blue Preferred Select', 'anthem-anthembluepreferredselect'),
(401, 'Anthem', 'medical', 'Anthem CO Blue Priority PPO', 'anthem-anthemcobluepriorityppo'),
(402, 'Anthem', 'medical', 'Anthem CO Pathway', 'anthem-anthemcopathway'),
(403, 'Anthem', 'medical', 'Anthem CO Pathway X Enhanced Ind Direct Access', 'anthem-anthemcopathwayxenhancedinddirectaccess'),
(404, 'Anthem', 'medical', 'Anthem HealthKeepers HMOPOS', 'anthem-anthemhealthkeepershmopos'),
(405, 'Anthem', 'medical', 'Anthem IN Pathway X Bronze Direct CACA HIX', 'anthem-antheminpathwayxbronzedirectcacahix'),
(406, 'Anthem', 'medical', 'Anthem KY Pathway X Ind Direct Access', 'anthem-anthemkypathwayxinddirectaccess'),
(407, 'Anthem', 'medical', 'Anthem KeyCare PPO', 'anthem-anthemkeycareppo'),
(408, 'Anthem', 'medical', 'Anthem MO Direct Access wHSA', 'anthem-anthemmodirectaccesswhsa'),
(409, 'Anthem', 'medical', 'Anthem NV Pathway PPO', 'anthem-anthemnvpathwayppo'),
(410, 'Anthem', 'medical', 'Anthem NV Pathway X HMOInd Direct Access', 'anthem-anthemnvpathwayxhmoinddirectaccess'),
(411, 'Anthem', 'medical', 'Anthem OH Pathway X Tiered HospInd Direct Access', 'anthem-anthemohpathwayxtieredhospinddirectaccess'),
(412, 'Anthem', 'medical', 'Anthem PPO', 'anthem-anthemppo'),
(413, 'Anthem', 'medical', 'Anthem PPO Century Preferred - CT', 'anthem-anthemppocenturypreferredct'),
(414, 'Anthem', 'medical', 'Anthem Pathway X EnhancedInd Direct Access NH', 'anthem-anthempathwayxenhancedinddirectaccessnh'),
(415, 'Anthem', 'medical', 'Anthem Pathway X EnhancedInd Guided Access ME', 'anthem-anthempathwayxenhancedindguidedaccessme'),
(416, 'Anthem', 'medical', 'Anthem Pathway X Ind PPO Direct Access CT', 'anthem-anthempathwayxindppodirectaccessct'),
(417, 'Anthem', 'medical', 'Anthem Pathway X Tier Hosp HealthKeepers DirectAccess VA', 'anthem-anthempathwayxtierhosphealthkeepersdirectaccessva'),
(418, 'Anthem', 'medical', 'Anthem WI Blue Priority XIndiv DirectAccess', 'anthem-anthemwibluepriorityxindivdirectaccess'),
(419, 'Anthem', 'dental', 'BC CA Dental Blue 100200300', 'bluecrosscalifornia-bccadentalblue100200300'),
(420, 'Anthem', 'medical', 'Blue Cross CA Advantage PPO Preferred DirectAccess Plus', 'bluecrosscalifornia-bluecrosscaadvantageppopreferreddirectaccessplus'),
(421, 'Anthem', 'medical', 'Blue Cross CA CaliforniaCare HMO', 'bluecrosscalifornia-bluecrosscacaliforniacarehmo'),
(422, 'Anthem', 'medical', 'Blue Cross CA PPO', 'bluecrosscalifornia-bluecrosscappo'),
(423, 'Anthem', 'medical', 'Blue Cross CA Pathway X HMO Guided Access', 'bluecrosscalifornia-bluecrosscapathwayxhmoguidedaccess'),
(424, 'Anthem', 'medical', 'Blue Cross CA Pathway X PPO Direct Access', 'bluecrosscalifornia-bluecrosscapathwayxppodirectaccess'),
(425, 'Anthem', 'medical', 'Blue Cross CA Pathway X Tiered Direct Access', 'bluecrosscalifornia-bluecrosscapathwayxtiereddirectaccess'),
(426, 'Anthem', 'medical', 'Blue Cross CA PowerSelect HMO', 'bluecrosscalifornia-bluecrosscapowerselecthmo'),
(427, 'Anthem', 'medical', 'Blue Cross CA Priority Select HMO', 'bluecrosscalifornia-bluecrosscapriorityselecthmo'),
(428, 'Anthem', 'medical', 'Blue Cross CA Select PPO', 'bluecrosscalifornia-bluecrosscaselectppo'),
(429, 'Anthem', 'medical', 'Blue Cross CA Select Plus HMO', 'bluecrosscalifornia-bluecrosscaselectplushmo'),
(430, 'Anthem', 'vision', 'Blue View Vision', 'anthem-blueviewvision'),
(431, 'Anthem', 'medical', 'Bronze DirectAccess Plus - gjqa', 'anthembluecrossblueshield-bronzedirectaccessplusgjqa'),
(432, 'Anthem', 'medical', 'Gold DirectAccess Plus with HSA', 'anthembluecrossblueshield-golddirectaccesspluswhsa'),
(433, 'Assurant', 'medical', 'Assurant DHA', 'assurant-assurantdha'),
(434, 'Assurant', 'medical', 'Assurant DHA Premier', 'assurant-assurantdhapremier'),
(435, 'Aultcare', 'medical', 'Aultcare PPO', 'aultcare-aultcareppo'),
(436, 'BCBS Blue Card', 'medical', 'BCBS Blue Card PPO', 'bcbsbluecard-bcbsbluecardppo'),
(437, 'BCBS Minnesota', 'medical', 'BCBS MN Blue Cross Accord', 'bcbsminnesota-bcbsmnbluecrossaccord'),
(438, 'Blue Cross Blue Sheild of Alabama', 'medical', 'BCBS AL PPO', 'bluecrossbluesheildofalabama-bcbsalppo'),
(439, 'Blue Cross Blue Sheild of Alabama', 'dental', 'BCBS AL Preferred Dentists', 'bluecrossbluesheildofalabama-bcbsalpreferreddentists'),
(440, 'Blue Cross Blue Shield of Aritona', 'medical', 'BCBS AZ Alliance', 'bluecrossblueshieldofaritona-bcbsazalliance'),
(441, 'Blue Cross Blue Shield of Florida', 'dental', 'FL Blue BlueDental Choice  Choice Plus PPO', 'bluecrossblueshieldofflorida-flbluebluedentalchoicechoiceplusppo'),
(442, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue BlueCare HMO', 'bluecrossblueshieldofflorida-floridabluebluecarehmo'),
(443, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue BlueOptions', 'bluecrossblueshieldofflorida-floridablueblueoptions'),
(444, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue BlueSelect', 'bluecrossblueshieldofflorida-floridablueblueselect'),
(445, 'Blue Cross Blue Shield of Florida', 'medical', 'Florida Blue NetworkBlue', 'bluecrossblueshieldofflorida-floridabluenetworkblue'),
(446, 'Blue Cross Blue Shield of Florida BCBSFL', 'medical', 'Florida Blue - BlueOptions - HIX', 'bcbsflorida-floridablueblueoptionshix'),
(447, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Blue Choice HMO', 'bluecrossblueshieldofgeorgia-bcbsgabluechoicehmo'),
(448, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Blue Choice PPO', 'bluecrossblueshieldofgeorgia-bcbsgabluechoiceppo'),
(449, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Blue Open Access POS', 'bluecrossblueshieldofgeorgia-bcbsgablueopenaccesspos'),
(450, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA BlueChoice Option POS', 'bluecrossblueshieldofgeorgia-bcbsgabluechoiceoptionpos'),
(451, 'Blue Cross Blue Shield of Georgia', 'dental', 'BCBS GA Dental Complete', 'bluecrossblueshieldofgeorgia-bcbsgadentalcomplete'),
(452, 'Blue Cross Blue Shield of Georgia', 'medical', 'BCBS GA Direct Access wHSA', 'bluecrossblueshieldofgeorgia-bcbsgadirectaccesswhsa'),
(453, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL Blue Advantage HMO', 'bluecrossblueshieldofillinois-bcbsilblueadvantagehmo'),
(454, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL Blue Precision HMO', 'bluecrossblueshieldofillinois-bcbsilblueprecisionhmo'),
(455, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL BlueChoice Select', 'bluecrossblueshieldofillinois-bcbsilbluechoiceselect'),
(456, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL HMO Illinois', 'bluecrossblueshieldofillinois-bcbsilhmoillinois'),
(457, 'Blue Cross Blue Shield of Illinois', 'medical', 'BCBS IL PPO', 'bluecrossblueshieldofillinois-bcbsilppo'),
(458, 'Blue Cross Blue Shield of Kansas City', 'medical', 'BCBS KC Preferred-Care Blue PPO', 'bluecrossblueshieldofkansascity-bcbskcpreferredcareblueppo'),
(459, 'Blue Cross Blue Shield of Louisiana', 'dental', 'BCBS LA Blue Cross Dental Network', 'bluecrossblueshieldoflouisiana-bcbslabluecrossdentalnetwork'),
(460, 'Blue Cross Blue Shield of Louisiana', 'medical', 'BCBS LA BlueConnect HMOPOS', 'bluecrossblueshieldoflouisiana-bcbslablueconnecthmopos');
INSERT INTO `insurance` (`id`, `insurer`, `type`, `network`, `uid`) VALUES
(461, 'Blue Cross Blue Shield of Louisiana', 'medical', 'BCBS LA Community Blue HMOPOS', 'bluecrossblueshieldoflouisiana-bcbslacommunitybluehmopos'),
(462, 'Blue Cross Blue Shield of Massachusetts', 'medical', 'BCBS MA Blue Care Elect PPO', 'bluecrossblueshieldofmassachusetts-bcbsmabluecareelectppo'),
(463, 'Blue Cross Blue Shield of Massachusetts', 'medical', 'BCBS MA HMO Blue with Managed Care Behavioral Health', 'bluecrossblueshieldofmassachusetts-bcbsmahmobluewithmanagedcarebehavioralhealth'),
(464, 'Blue Cross Blue Shield of Massachusetts', 'medical', 'BCBS MA Preferred Blue PPO', 'bluecrossblueshieldofmassachusetts-bcbsmapreferredblueppo'),
(465, 'Blue Cross Blue Shield of Michigan', 'medical', 'BCBS MI Blue Care Network', 'bluecrossblueshieldofmichigan-bcbsmibluecarenetwork'),
(466, 'Blue Cross Blue Shield of Michigan', 'medical', 'BCBS MI Blue Care Network PCP Focus Network', 'bluecrossblueshieldofmichigan-bcbsmibluecarenetworkpcpfocusnetwork'),
(467, 'Blue Cross Blue Shield of Michigan', 'medical', 'BCBS MI PPO Plans - Group Employees', 'bluecrossblueshieldofmichigan-bcbsmippoplansgroupemployees'),
(468, 'Blue Cross Blue Shield of New Mexico', 'medical', 'BCBS NM PPO NM', 'bluecrossblueshieldofnewmexico-bcbsnmpponm'),
(469, 'Blue Cross Blue Shield of Oklahoma', 'medical', 'BCBS OK BlueChoice', 'bluecrossblueshieldofoklahoma-bcbsokbluechoice'),
(470, 'Blue Cross Blue Shield of Rhode Island', 'medical', 'BCBS RI HealthMate Coast-to-Coast', 'bluecrossblueshieldofrhodeisland-bcbsrihealthmatecoasttocoast'),
(471, 'Blue Cross Blue Shield of TX', 'dental', 'BCBS TX BlueCare Dental', 'bluecrossblueshieldoftx-bcbstxbluecaredental'),
(472, 'Blue Cross Blue Shield of TX', 'dental', 'BCBS TX DentaBlue', 'bluecrossblueshieldoftx-bcbstxdentablue'),
(473, 'Blue Cross Blue Shield of Tennessee', 'medical', 'BCBS TN Blue Network E', 'bluecrossblueshieldoftennessee-bcbstnbluenetworke'),
(474, 'Blue Cross Blue Shield of Tennessee', 'medical', 'BCBS TN Network S', 'bluecrossblueshieldoftennessee-bcbstnnetworks'),
(475, 'Blue Cross Blue Shield of Texas', 'medical', 'BCBS NC BlueOptions Group PPO', 'bluecrossblueshieldoftexas-bcbsncblueoptionsgroupppo'),
(476, 'Blue Cross Blue Shield of Texas', 'medical', 'BCBS TX Blue Advantage HMO', 'bluecrossblueshieldoftexas-bcbstxblueadvantagehmo'),
(477, 'Blue Cross Blue Shield of Texas', 'medical', 'BCBS TX BlueChoice', 'bluecrossblueshieldoftexas-bcbstxbluechoice'),
(478, 'Blue Cross Blue Shield of Texas BCBSTX', 'medical', 'Blue Advantage - HMO - HIX', 'bcbstexas-bcbstxblueadvantagehmohix'),
(479, 'Blue Cross Blue Shield of Wyoming', 'medical', 'BCBS WY BlueChoice Personal', 'bluecrossblueshieldofwyoming-bcbswybluechoicepersonal'),
(480, 'Blue Cross Idaho', 'medical', 'Blue Cross ID PPO', 'bluecrossidaho-bluecrossidppo'),
(481, 'Blue Shield of California', 'dental', 'BS CA Dental PPO', 'blueshieldofcalifornia-bscadentalppo'),
(482, 'Blue Shield of California', 'medical', 'BS CA Platinum 90 EPO', 'blueshieldofcalifornia-bscaplatinum90epo'),
(483, 'Blue Shield of California', 'medical', 'BS CA Trio ACO HMO', 'blueshieldofcalifornia-bscatrioacohmo'),
(484, 'Blue Shield of California', 'medical', 'Basic EPO - Bronze level HIX', 'blueshieldofcalifornia-blueshieldcabasicepobronzelevelhix'),
(485, 'Blue Shield of California', 'medical', 'Basic PPO - Bronze level HIX', 'blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix'),
(486, 'Blue Shield of California', 'medical', 'Blue Shield CA Access Plus HMO', 'blueshieldofcalifornia-blueshieldcaaccessplushmo'),
(487, 'Blue Shield of California', 'medical', 'Blue Shield CA Access Plus Savenet', 'blueshieldofcalifornia-blueshieldcaaccessplussavenet'),
(488, 'Blue Shield of California', 'medical', 'Blue Shield CA Basic EPO', 'blueshieldofcalifornia-blueshieldcabasicepo'),
(489, 'Blue Shield of California', 'medical', 'Blue Shield CA Basic Exclusive PPO for Small Business', 'blueshieldofcalifornia-blueshieldcabasicexclusiveppoforsmallbusiness'),
(490, 'Blue Shield of California', 'medical', 'Blue Shield CA Basic PPO', 'blueshieldofcalifornia-blueshieldcabasicppo'),
(491, 'Blue Shield of California', 'medical', 'Blue Shield CA Enhanced Exclusive HMO for Small Business', 'blueshieldofcalifornia-blueshieldcaenhancedexclusivehmoforsmallbusiness'),
(492, 'Blue Shield of California', 'medical', 'Blue Shield CA Local Access Plus HMO', 'blueshieldofcalifornia-blueshieldcalocalaccessplushmo'),
(493, 'Blue Shield of California', 'medical', 'Blue Shield CA PPO', 'blueshieldofcalifornia-blueshieldcappo'),
(494, 'Bluegrass Family Health', 'medical', 'Bluegrass Family Health PPO', 'bluegrassfamilyhealth-bluegrassfamilyhealthppo'),
(495, 'Bridgespan', 'medical', 'Bridgespan - HIX', 'bridgespan-bridgespanhix'),
(496, 'Buckeye Community Health Plan', 'medical', 'Ambetter from Buckeye Community Health Plan HIX', 'buckeyecommunityhealthplan-ambetterfrombuckeyecommunityhealthplanhix'),
(497, 'Capital Blue Cross', 'medical', 'Capital BC Keystone Health Plan Central HMO', 'capitalbluecross-capitalbckeystonehealthplancentralhmo'),
(498, 'Capital Blue Cross', 'medical', 'Capital BC PPO', 'capitalbluecross-capitalbcppo'),
(499, 'Capital District Physicians Health Plan', 'medical', 'CDPHP HMO', 'capitaldistrictphysicianshealthplan-cdphphmo'),
(500, 'Capital District Physicians Health Plan', 'medical', 'CDPHP PPO', 'capitaldistrictphysicianshealthplan-cdphpppo'),
(501, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst BlueChoice Advantage', 'carefirstbluecrossblueshield-carefirstbluechoiceadvantage'),
(502, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst BlueChoice Ntwk POS', 'carefirstbluecrossblueshield-carefirstbluechoicentwkpos'),
(503, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst BluePreferred PPO', 'carefirstbluecrossblueshield-carefirstbluepreferredppo'),
(504, 'Care First Blue Cross Blue Shield', 'medical', 'CareFirst Maryland POS', 'carefirstbluecrossblueshield-carefirstmarylandpos'),
(505, 'Care First Blue Cross Blue Shield', 'dental', 'CareFirst Regional Preferred Dental PPO', 'carefirstbluecrossblueshield-carefirstregionalpreferreddentalppo'),
(506, 'Care First Blue Cross Blue Shield', 'dental', 'CareFirst Regional Traditional Dental', 'carefirstbluecrossblueshield-carefirstregionaltraditionaldental'),
(507, 'Chinese Community Health Plan', 'medical', 'Chinese Community Health Plan', 'chinesecommunityhealthplan-chinesecommunityhealthplan'),
(508, 'Cigna', 'medical', 'CIGNA HMO', 'cigna-cignahmo'),
(509, 'Cigna', 'medical', 'CIGNA LocalPlus', 'cigna-cignalocalplus'),
(510, 'Cigna', 'medical', 'CIGNA Open Access Plus', 'cigna-cignaopenaccessplus'),
(511, 'Cigna', 'medical', 'CIGNA PPO', 'cigna-cignappo'),
(512, 'Cigna', 'vision', 'Vision', 'cigna-vision'),
(513, 'Cigna Dental', 'dental', 'CIGNA Dental DHMO', 'cignadental-cignadentaldhmo'),
(514, 'Cigna Dental', 'dental', 'CIGNA Total DPPO', 'cignadental-cignatotaldppo'),
(515, 'Cofinity', 'medical', 'Cofinity PPO', 'cofinity-cofinityppo'),
(516, 'CommUnityCare Health Centers', 'medical', 'CommunityCare PPO Standard Network', 'communitycarehealthcenters-communitycareppostandardnetwork'),
(517, 'CommUnityCare Health Centers', 'medical', 'CommunityCare Plus POS Standard Network', 'communitycarehealthcenters-communitycareplusposstandardnetwork'),
(518, 'CompBenefits Corporation', 'medical', 'CompBenefits AdvantagePlus Plans', 'compbenefitscorporation-compbenefitsadvantageplusplans'),
(519, 'CompBenefits Corporation', 'dental', 'CompBenefits Dental Access Plan', 'compbenefitscorporation-compbenefitsdentalaccessplan'),
(520, 'CompBenefits Corporation', 'medical', 'CompBenefits PPO', 'compbenefitscorporation-compbenefitsppo'),
(521, 'Connecticare', 'medical', 'Connecticare FlexPOS', 'connecticare-connecticareflexpos'),
(522, 'Connecticare', 'medical', 'Connecticare HMO Open Access', 'connecticare-connecticarehmoopenaccess'),
(523, 'Coventry Health Care', 'medical', 'CareLink PPO - WV', 'coventryhealthcare-carelinkppowv'),
(524, 'Coventry Health Care', 'medical', 'Coventry Carelink - HMO  HIX', 'coventryhealthcare-coventrycarelinkhmohix'),
(525, 'Coventry Health Care', 'medical', 'Coventry Carelink HMO FL', 'coventryhealthcare-coventrycarelinkhmofl'),
(526, 'Coventry Health Care', 'medical', 'Coventry Employer Group HMOOpen Access - FL', 'coventryhealthcare-coventryemployergrouphmoopenaccessfl'),
(527, 'Coventry Health Care', 'medical', 'Coventry Employer Group PPO - FL', 'coventryhealthcare-coventryemployergroupppofl'),
(528, 'Coventry Health Care', 'medical', 'Coventry Freedom PPO - OK', 'coventryhealthcare-coventryfreedomppook'),
(529, 'Coventry Health Care', 'medical', 'Coventry Health  Life IL - PPO', 'coventryhealthcare-coventryhealthlifeilppo'),
(530, 'Coventry Health Care', 'medical', 'Coventry Health Care of Nevada PPO', 'coventryhealthcare-coventryhealthcareofnevadappo'),
(531, 'Coventry Health Care', 'medical', 'Coventry Health Care of VA HMO', 'coventryhealthcare-coventryhealthcareofvahmo'),
(532, 'Coventry Health Care', 'medical', 'Coventry HealthAmerica HMO', 'coventryhealthcare-coventryhealthamericahmo'),
(533, 'Coventry Health Care', 'medical', 'Coventry HealthAmerica PPO', 'coventryhealthcare-coventryhealthamericappo'),
(534, 'Coventry Health Care', 'medical', 'Coventry IA - PPO', 'coventryhealthcare-coventryiappo'),
(535, 'Coventry Health Care', 'medical', 'Coventry IL - PPO', 'coventryhealthcare-coventryilppo'),
(536, 'Coventry Health Care', 'medical', 'Coventry IL - PPO Platinum', 'coventryhealthcare-coventryilppoplatinum'),
(537, 'Coventry Health Care', 'medical', 'Coventry KS - PPO', 'coventryhealthcare-coventryksppo'),
(538, 'Coventry Health Care', 'medical', 'Coventry Life  Health OK', 'coventryhealthcare-coventrylifehealthok'),
(539, 'Coventry Health Care', 'medical', 'Coventry MO - HMOPOS', 'coventryhealthcare-coventrymohmopos'),
(540, 'Coventry Health Care', 'medical', 'Coventry MO - PPO', 'coventryhealthcare-coventrymoppo'),
(541, 'Coventry Health Care', 'medical', 'Coventry NE - PPO', 'coventryhealthcare-coventryneppo'),
(542, 'Coventry Health Care', 'medical', 'Coventry PPO - DE', 'coventryhealthcare-coventryppode'),
(543, 'Coventry Health Care', 'medical', 'Coventry PPO - TN', 'coventryhealthcare-coventryppotn'),
(544, 'Coventry Health Care', 'medical', 'Coventry Southern Health PPO', 'coventryhealthcare-coventrysouthernhealthppo'),
(545, 'Coventry Health Care', 'medical', 'Coventry UT Peak Advantage', 'coventryhealthcare-coventryutpeakadvantage'),
(546, 'Coventry Health Care', 'medical', 'Coventry Wellpath Preferred PPO', 'coventryhealthcare-coventrywellpathpreferredppo'),
(547, 'Coventry Health Care', 'medical', 'CoventryOne - HMO  HIX', 'coventryhealthcare-coventryonehmohix'),
(548, 'Coventry Health Care', 'medical', 'CoventryOne HMO', 'coventryhealthcare-coventryonehmo'),
(549, 'Delta Dental', 'dental', 'Delta Dental DeltaCare USA', 'deltadental-deltadentaldeltacareusa'),
(550, 'Delta Dental', 'dental', 'Delta Dental PPO', 'deltadental-deltadentalppo'),
(551, 'Delta Dental', 'dental', 'Delta Dental Premier', 'deltadental-deltadentalpremier'),
(552, 'Dental Network of America', 'dental', 'Dental Network of America DPPO', 'dentalnetworkofamerica-dentalnetworkofamericadppo'),
(553, 'DenteMax', 'dental', 'DenteMax Dental', 'dentemax-dentemaxdental'),
(554, 'Diversified Dental', 'dental', 'Diversified Dental PPO', 'diversifieddental-diversifieddentalppo'),
(555, 'Dominion Group', 'dental', 'Dominion Dental PPO', 'dominiongroup-dominiondentalppo'),
(556, 'Emblem Health', 'dental', 'Emblem Dental - Preferred Plus', 'emblemhealth-emblemdentalpreferredplus'),
(557, 'Emblem Health', 'medical', 'EmblemHealth PPO GHI', 'emblemhealth-emblemhealthppoghi'),
(558, 'Empire BCBS', 'medical', 'Empire HMO', 'empirebcbs-empirehmo'),
(559, 'Empire BCBS', 'medical', 'Empire PPO', 'empirebcbs-empireppo'),
(560, 'Empire BCBS', 'medical', 'Empire Pathway Enhanced Guided Access', 'empirebcbs-empirepathwayenhancedguidedaccess'),
(561, 'Empire BCBS', 'medical', 'Empire Prism EPO - Blue Priority', 'empirebcbs-empireprismepobluepriority'),
(562, 'Excellus BCBS', 'medical', 'Excellus BluePPO', 'excellusbcbs-excellusblueppo'),
(563, 'Excellus BCBS', 'medical', 'Excellus HMOBlue', 'excellusbcbs-excellushmoblue'),
(564, 'First Choice', 'medical', 'First Choice', 'firstchoice-firstchoice'),
(565, 'First Dental Health', 'dental', 'First Dental Health', 'firstdentalhealth-firstdentalhealth'),
(566, 'First Health Coventry Healthcare', 'medical', 'First Health PPO', 'firsthealthcoventryhealthcare-firsthealthppo'),
(567, 'GWH-Cigna', 'medical', 'Great West PPO', 'gwhcigna-greatwestppo'),
(568, 'Geisinger Health Plan', 'medical', 'Geisinger Health Plan', 'geisingerhealthplan-geisingerhealthplan'),
(569, 'Group Health Cooperative', 'medical', 'Group Health Coop Alliant PlusConnect', 'grouphealthcooperative-grouphealthcoopalliantplusconnect'),
(570, 'Group Health Cooperative', 'medical', 'Group Health Coop Core', 'grouphealthcooperative-grouphealthcoopcore'),
(571, 'Guardian Dental', 'dental', 'Guardian DentalGuard Preferred', 'guardiandental-guardiandentalguardpreferred'),
(572, 'Guardian Dental', 'dental', 'Guardian Managed Dental Care', 'guardiandental-guardianmanageddentalcare'),
(573, 'Guardian Dental', 'dental', 'Guardian Managed DentalGuard', 'guardiandental-guardianmanageddentalguard'),
(574, 'Gundersen Health Plan', 'medical', 'Gundersen Health Plan Select Network', 'gundersenhealthplan-gundersenhealthplanselectnetwork'),
(575, 'HAP', 'medical', 'HAP PPO', 'hap-happpo'),
(576, 'HAP', 'medical', 'HAP Preferred PPO', 'hap-happreferredppo'),
(577, 'HIP of NY', 'medical', 'Emblem HIP Select PPO', 'hipofny-emblemhipselectppo'),
(578, 'HMSA', 'medical', 'HMSA Preferred ProviderComp Med', 'hmsa-hmsapreferredprovidercompmed'),
(579, 'Harvard Pilgrim', 'medical', 'Harvard Pilgrim PPO', 'harvardpilgrim-harvardpilgrimppo'),
(580, 'Health Alliance', 'medical', 'Health Alliance HMOPOS', 'healthalliance-healthalliancehmopos'),
(581, 'Health Alliance', 'medical', 'Health Alliance PPO', 'healthalliance-healthallianceppo'),
(582, 'Health Plan of Nevada', 'medical', 'Health Plan of NV HMO - Northern NV', 'healthplanofnevada-healthplanofnvhmonorthernnv'),
(583, 'Health Plan of Nevada', 'medical', 'Health Plan of NV HMO - Rural NV', 'healthplanofnevada-healthplanofnvhmoruralnv'),
(584, 'Health Plan of Nevada', 'medical', 'Health Plan of NV HMO - Southern NV', 'healthplanofnevada-healthplanofnvhmosouthernnv'),
(585, 'HealthFirst NY', 'medical', 'Healthfirst NY HMO ABCD', 'healthfirstny-healthfirstnyhmoabcd'),
(586, 'HealthLink', 'medical', 'HealthLink PPO', 'healthlink-healthlinkppo'),
(587, 'HealthNet', 'medical', 'Blue  Gold - HMO', 'healthnet-bluegoldhmo'),
(588, 'HealthNet', 'medical', 'HMO - ExcelCare  Silver Network', 'healthnet-hmoexcelcaresilvernetwork'),
(589, 'HealthNet', 'medical', 'HMO - ExcelCare  Silver Network Medicare COB', 'healthnet-hmoexcelcaresilvernetworkmedicarecob'),
(590, 'HealthNet', 'medical', 'Health Net AZ HMO ExcelCare Network', 'healthnet-healthnetazhmoexcelcarenetwork'),
(591, 'HealthNet', 'medical', 'Health Net AZ PPOPOS', 'healthnet-healthnetazppopos'),
(592, 'HealthNet', 'medical', 'Health Net CA Blue  Gold HMO', 'healthnet-healthnetcabluegoldhmo'),
(593, 'HealthNet', 'medical', 'Health Net CA CommunityCare Network HMO', 'healthnet-healthnetcacommunitycarenetworkhmo'),
(594, 'HealthNet', 'medical', 'Health Net CA Covered California PPO - Small Group', 'healthnet-healthnetcacoveredcaliforniapposmallgroup'),
(595, 'HealthNet', 'medical', 'Health Net CA HMO Employer Group', 'healthnet-healthnetcahmoemployergroup'),
(596, 'HealthNet', 'medical', 'Health Net CA HMO SmartCare', 'healthnet-healthnetcahmosmartcare'),
(597, 'HealthNet', 'medical', 'Health Net CA HMO Whole Care Network', 'healthnet-healthnetcahmowholecarenetwork'),
(598, 'HealthNet', 'medical', 'Health Net CA Individual  Family PPO', 'healthnet-healthnetcaindividualfamilyppo'),
(599, 'HealthNet', 'medical', 'Health Net CA Large Group PPO', 'healthnet-healthnetcalargegroupppo'),
(600, 'HealthNet', 'medical', 'Health Net CA Primary EPO', 'healthnet-healthnetcaprimaryepo'),
(601, 'HealthNet', 'medical', 'Health Net CommunityCare Network - HMO  HIX', 'healthnet-healthnetcommunitycarenetworkhmohix'),
(602, 'HealthNet', 'medical', 'Health Net Individual  Family - PPO  HIX', 'healthnet-healthnetindividualfamilyppohix'),
(603, 'HealthNet', 'medical', 'Health Net OR CommunityCare', 'healthnet-healthnetorcommunitycare'),
(604, 'HealthNet', 'medical', 'Health Net OR PPO', 'healthnet-healthnetorppo'),
(605, 'HealthNow', 'medical', 'HealthNow PPO', 'healthnow-healthnowppo'),
(606, 'HealthPlus of Michigan', 'medical', 'HealthPlus HMO', 'healthplusofmichigan-healthplushmo'),
(607, 'HealthSpan', 'medical', 'HealthSpan Access PPO', 'healthspan-healthspanaccessppo'),
(608, 'Highmark Blue Cross Blue Shield', 'medical', 'Highmark Community Blue PPO', 'highmarkbluecrossblueshield-highmarkcommunityblueppo'),
(609, 'Highmark Blue Cross Blue Shield', 'medical', 'Highmark PPOBlue', 'highmarkbluecrossblueshield-highmarkppoblue'),
(610, 'Home State Health Plan', 'medical', 'Homestate Health Plan', 'homestatehealthplan-homestatehealthplan'),
(611, 'Horizon BCBS', 'medical', 'Horizon Advance EPO', 'horizonbcbs-horizonadvanceepo'),
(612, 'Horizon BCBS', 'dental', 'Horizon Dental PPO', 'horizonbcbs-horizondentalppo'),
(613, 'Horizon BCBS', 'medical', 'Horizon Direct Access', 'horizonbcbs-horizondirectaccess'),
(614, 'Horizon BCBS', 'medical', 'Horizon HMO', 'horizonbcbs-horizonhmo'),
(615, 'Horizon BCBS', 'medical', 'Horizon POS', 'horizonbcbs-horizonpos'),
(616, 'Horizon BCBS', 'medical', 'Horizon PPO', 'horizonbcbs-horizonppo'),
(617, 'Humana', 'medical', 'Atlanta - HMOx HIX', 'humana-humanaatlantahmoxhix'),
(618, 'Humana', 'medical', 'Austin - HMOx HIX', 'humana-humanaaustinhmoxhix'),
(619, 'Humana', 'medical', 'Colorado - HMOx  HIX', 'humana-humanacohmoxhix'),
(620, 'Humana', 'medical', 'Columbus Georgia - HMOx HIX', 'humana-humanacolumbusgahmoxhix'),
(621, 'Humana', 'medical', 'HMO - Premier HIX', 'humana-humanahmopremierhix'),
(622, 'Humana', 'medical', 'Humana Atlanta HMOx', 'humana-humanaatlantahmox'),
(623, 'Humana', 'medical', 'Humana ChoiceCare Network PPO', 'humana-humanachoicecarenetworkppo'),
(624, 'Humana', 'medical', 'Humana Columbus GA HMOx', 'humana-humanacolumbusgahmox'),
(625, 'Humana', 'dental', 'Humana Dental PPO', 'humana-humanadentalppo'),
(626, 'Humana', 'medical', 'Humana Gold Plus HMO', 'humana-humanagoldplushmo'),
(627, 'Humana', 'medical', 'Humana HMO Select', 'humana-humanahmoselect'),
(628, 'Humana', 'medical', 'Humana Houston HMOx', 'humana-humanahoustonhmox'),
(629, 'Humana', 'medical', 'Humana Phoenix HMOx', 'humana-humanaphoenixhmox'),
(630, 'Humana', 'medical', 'Humana Preferred PPO', 'humana-humanapreferredppo'),
(631, 'Humana', 'medical', 'Humana South Florida HUMx HMOx', 'humana-humanasouthfloridahumxhmox'),
(632, 'Humana', 'medical', 'Humana Tampa Bay CoreNet', 'humana-humanatampabaycorenet'),
(633, 'Humana', 'medical', 'Humana Tampa Bay HUMx HMOx', 'humana-humanatampabayhumxhmox'),
(634, 'Humana', 'medical', 'Humana Tucson HMOx', 'humana-humanatucsonhmox'),
(635, 'Humana', 'medical', 'Rio Grande - EPOx HIX', 'humana-humanariograndeepoxhix'),
(636, 'Humana', 'medical', 'San Antonio - HMOx HIX', 'humana-humanasanantoniohmoxhix'),
(637, 'Humana', 'medical', 'South Florida - HUMx HMOx HIX', 'humana-humanasouthfloridahumxhmoxhix'),
(638, 'Humana', 'medical', 'Tampa Bay - HUMx HMOx HIX', 'humana-humanatampabayhumxhmoxhix'),
(639, 'Humana', 'medical', 'Waco - HMOx HIX', 'humana-humanawacohmoxhix'),
(640, 'IBC  Amerihealth', 'medical', 'AmeriHealth Local Value Network - EPO POS PPO HIX', 'ibcamerihealth-amerihealthlocalvaluenetworkepoposppohix'),
(641, 'IBC  Amerihealth', 'medical', 'AmeriHealth Local Value Network - HMO HMO POS HIX', 'ibcamerihealth-amerihealthlocalvaluenetworkhmohmoposhix'),
(642, 'IBC  Amerihealth', 'medical', 'AmeriHealth Regional Pref Network - EPO POS PPO HIX', 'ibcamerihealth-amerihealthregionalprefntwkepoposppohix'),
(643, 'IBC  Amerihealth', 'medical', 'AmeriHealth Regional Pref Network - HMO HMO POS HIX', 'ibcamerihealth-amerihealthregionalprefntwkhmohmoposhix'),
(644, 'Independence Blue Cross', 'medical', 'IBC Keystone HMO  POS', 'independencebluecross-ibckeystonehmopos'),
(645, 'Independence Blue Cross', 'medical', 'IBC Personal Choice PPO', 'independencebluecross-ibcpersonalchoiceppo'),
(646, 'Independent Health Association', 'medical', 'Independent Health Encompass HMO', 'independenthealthassociation-independenthealthencompasshmo'),
(647, 'Independent Health Association', 'medical', 'Independent Health FlexFit HMO', 'independenthealthassociation-independenthealthflexfithmo'),
(648, 'Kaiser - MidAtlantic', 'medical', 'Kaiser Permanente Mid-Atlantic', 'kaisermidatlantic-kaiserpermanentemidatlantic'),
(649, 'Kaiser Permanente', 'medical', 'Kaiser Permanente', 'kaiserpermanente-kaiserpermanente'),
(650, 'L.A. Care Health', 'medical', 'LACare', 'lacarehealth-lacare'),
(651, 'L.A. Care Health', 'medical', 'LACare Covered - HIX', 'lacarehealth-lacarecoveredhix'),
(652, 'Liberty Dental Plan', 'dental', 'Liberty Dental CA Independence PPO', 'libertydentalplan-libertydentalcaindependenceppo'),
(653, 'Lifewise health Plan of Oregon', 'medical', 'Lifewise Health Plan of Oregon', 'lifewisehealthplanoforegon-lifewisehealthplanoforegon'),
(654, 'MHS Indiana', 'medical', 'Ambetter from MHS HIX', 'mhsindiana-ambetterfrommhshix'),
(655, 'MHealth Insured', 'medical', 'MHealth Insured', 'mhealthinsured-mhealthinsured'),
(656, 'MVP Health Plan', 'medical', 'MVP HMO', 'mvphealthplan-mvphmo'),
(657, 'MVP Health Plan', 'medical', 'MVP Preferred PPO', 'mvphealthplan-mvppreferredppo'),
(658, 'Magnacare', 'medical', 'Extra Health Republic - HIX', 'magnacare-magnacareextrahealthrepublichix'),
(659, 'Magnacare', 'medical', 'MagnaCare PPO', 'magnacare-magnacareppo'),
(660, 'Medicaid', 'medical', 'Medicaid', 'medicaid-medicaid'),
(661, 'Medical Mutual of Ohio', 'medical', 'MMOH SuperMed POS', 'medicalmutualofohio-mmohsupermedpos'),
(662, 'Medical Mutual of Ohio', 'medical', 'MMOH SuperMed Plus', 'medicalmutualofohio-mmohsupermedplus'),
(663, 'Medicare', 'medical', 'Medicare', 'medicare-medicare'),
(664, 'MetLife', 'medical', 'MetLife HMO', 'metlife-metlifehmo'),
(665, 'MetLife', 'dental', 'MetLife PDP', 'metlife-metlifepdp'),
(666, 'Molina Healthcare', 'medical', 'Molina Marketplace - California - HIX', 'molinahealthcare-molinamrktplacecahix'),
(667, 'Molina Healthcare', 'medical', 'Molina Mrktplace CA', 'molinahealthcare-molinamrktplaceca'),
(668, 'Multiplan', 'medical', 'Multiplan PPO', 'multiplan-multiplanppo'),
(669, 'Multiplan', 'medical', 'PHCS PPO', 'multiplan-phcsppo'),
(670, 'Multiplan', 'medical', 'PHCS PPO - Kaiser', 'multiplan-phcsppokaiser'),
(671, 'ODS Health Plan', 'medical', 'ODS Network', 'odshealthplan-odsnetwork'),
(672, 'Oxford Health', 'medical', 'Oxford Freedom', 'oxfordhealth-oxfordfreedom'),
(673, 'Oxford Health', 'medical', 'Oxford Liberty', 'oxfordhealth-oxfordliberty'),
(674, 'PacificSource Health Plans', 'medical', 'PacificSource Preferred PSN', 'pacificsourcehealthplans-pacificsourcepreferredpsn'),
(675, 'Paramount', 'medical', 'Paramount Ohio HMO PICO', 'paramount-paramountohiohmopico'),
(676, 'Premera Blue Cross', 'medical', 'Premera Heritage  Heritage Plus 1', 'premerabluecross-premeraheritageheritageplus1'),
(677, 'Premera Blue Cross', 'medical', 'Premera Heritage Signature', 'premerabluecross-premeraheritagesignature'),
(678, 'Premera Blue Cross', 'medical', 'Premera LifeWise Connect', 'premerabluecross-premeralifewiseconnect'),
(679, 'Premera Blue Cross Blue Shield', 'medical', 'LifeWise Connect - HIX', 'premerabcbs-lifewiseconnecthix'),
(680, 'Premera Blue Cross Blue Shield', 'medical', 'Premera Heritage Signature - HIX', 'premerabcbs-premeraheritagesignaturehix'),
(681, 'Presbyterian Healthcare Services', 'medical', 'Presbyterian Commercial', 'presbyterianhealthcareservices-presbyteriancommercial'),
(682, 'Principal Financial Services', 'dental', 'Principal Dental PPO', 'principalfinancialservices-principaldentalppo'),
(683, 'PriorityHealth', 'medical', 'PriorityHealth HMO', 'priorityhealth-priorityhealthhmo'),
(684, 'PriorityHealth', 'medical', 'PriorityHealth Priority PPO', 'priorityhealth-priorityhealthpriorityppo'),
(685, 'Providence Health System', 'medical', 'Providence Personal Option', 'providencehealthsystem-providencepersonaloption'),
(686, 'Providence Health System', 'medical', 'Providence Preferred PPO', 'providencehealthsystem-providencepreferredppo'),
(687, 'QualCare', 'medical', 'QualCare HMO', 'qualcare-qualcarehmo'),
(688, 'QualCare', 'medical', 'QualCare PPO', 'qualcare-qualcareppo'),
(689, 'Qualchoice', 'medical', 'Qualchoice PPO', 'qualchoice-qualchoiceppo'),
(690, 'Regence Blue Cross Blue Shield of Oregon', 'medical', 'Regence OR Preferred Provider Network', 'regencebluecrossblueshieldoforegon-regenceorpreferredprovidernetwork'),
(691, 'Regence Blue Cross Blue Shield of Utah', 'dental', 'Regence ValueCare', 'regencebluecrossblueshieldofutah-regencevaluecare'),
(692, 'Regence Blue Shield of Idaho', 'medical', 'Regence ID Preferred Provider Network', 'regenceblueshieldofidaho-regenceidpreferredprovidernetwork'),
(693, 'Regence Blue Shield of Washinton', 'medical', 'Regence WA Preferred Provider Network', 'regenceblueshieldofwashinton-regencewapreferredprovidernetwork'),
(694, 'Rocky Mountain Health Plans', 'medical', 'Rocky Mountain Summit Group', 'rockymountainhealthplans-rockymountainsummitgroup'),
(695, 'Sagamore Health Network', 'medical', 'Sagamore Plus', 'sagamorehealthnetwork-sagamoreplus'),
(696, 'Scion Dental', 'dental', 'Scion Dental', 'sciondental-sciondental'),
(697, 'Scott and White', 'medical', 'Scott and White PPO', 'scottandwhite-scottandwhiteppo'),
(698, 'Sharp Health Plan', 'medical', 'Sharp Blue Choice', 'sharphealthplan-sharpbluechoice'),
(699, 'Sharp Health Plan', 'medical', 'Sharp Gold Value', 'sharphealthplan-sharpgoldvalue'),
(700, 'Sharp Health Plan', 'medical', 'Sharp Health Performance', 'sharphealthplan-sharphealthperformance'),
(701, 'Sharp Health Plan', 'medical', 'Sharp Health Performance - HIX', 'sharphealthplan-sharphealthperformancehix'),
(702, 'Sharp Health Plan', 'medical', 'Sharp Health Premier', 'sharphealthplan-sharphealthpremier'),
(703, 'Sharp Health Plan', 'medical', 'Sharp Health Premier - HIX', 'sharphealthplan-sharphealthpremierhix'),
(704, 'Sierra Health', 'medical', 'Sierra Health Northern Nevada PPO', 'sierrahealth-sierrahealthnorthernnevadappo'),
(705, 'Sierra Health', 'medical', 'Sierra Health Southern Nevada PPO', 'sierrahealth-sierrahealthsouthernnevadappo'),
(706, 'Spectrum Health', 'medical', 'Spectrum Health', 'spectrumhealth-spectrumhealth'),
(707, 'Total Dental Administrators', 'dental', 'Total Dental Administrators PPO', 'totaldentaladministrators-totaldentaladministratorsppo'),
(708, 'Total Health Plan', 'medical', 'Total Health Plan Employer Sponsored HMO', 'totalhealthplan-totalhealthplanemployersponsoredhmo'),
(709, 'Tufts Health Plan', 'medical', 'Tufts PPO', 'tuftshealthplan-tuftsppo'),
(710, 'UHC West Formerly Pacificare', 'medical', 'Pacificare HMO', 'uhcwestformerlypacificare-pacificarehmo'),
(711, 'UHC West Formerly Pacificare', 'medical', 'UHC West SignatureValue Advantage HMO Value Network', 'uhcwestformerlypacificare-uhcwestsignaturevalueadvantagehmovaluenetwork'),
(712, 'UHC West Formerly Pacificare', 'medical', 'UHC West SignatureValue Alliance', 'uhcwestformerlypacificare-uhcwestsignaturevaluealliance'),
(713, 'UHC of the River Valley', 'medical', 'Neighborhood Health Partnership - Commercial', 'uhcoftherivervalley-neighborhoodhealthpartnershipcommercial'),
(714, 'United Concordia', 'medical', 'United Concordia Advantage Plus PPO', 'unitedconcordia-unitedconcordiaadvantageplusppo'),
(715, 'United Concordia', 'dental', 'United Concordia DHMO Concordia Plus General Dentist', 'unitedconcordia-unitedconcordiadhmoconcordiaplusgeneraldentist'),
(716, 'United Concordia', 'medical', 'United Concordia National Fee-For-Service', 'unitedconcordia-unitedconcordianationalfeeforservice'),
(717, 'United Healthcare', 'medical', 'UHC Choice Plus POS', 'unitedhealthcare-uhcchoicepluspos'),
(718, 'United Healthcare', 'medical', 'UHC Medica Choice', 'unitedhealthcare-uhcmedicachoice'),
(719, 'United Healthcare', 'medical', 'UHC Navigate HMO', 'unitedhealthcare-uhcnavigatehmo'),
(720, 'United Healthcare', 'medical', 'UHC Navigate POS', 'unitedhealthcare-uhcnavigatepos'),
(721, 'United Healthcare', 'medical', 'UHC Options PPO', 'unitedhealthcare-uhcoptionsppo'),
(722, 'United Healthcare Dental', 'dental', 'United Healthcare Dental DHMO CA Only', 'unitedhealthcaredental-unitedhealthcaredentaldhmocaonly'),
(723, 'United Healthcare Dental', 'dental', 'United Healthcare Dental PPO', 'unitedhealthcaredental-unitedhealthcaredentalppo'),
(724, 'Unity Health Insurance', 'medical', 'Unity Health Ins Unity Network', 'unityhealthinsurance-unityhealthinsunitynetwork'),
(725, 'VSP', 'vision', 'VSP', 'vsp-vsp'),
(726, 'Wellmark Blue Cross and Blue Shield', 'medical', 'Wellmark Alliance Select', 'wellmarkbluecrossandblueshield-wellmarkallianceselect'),
(727, 'Western Health Advantage', 'medical', 'Western Health Advantage', 'westernhealthadvantage-westernhealthadvantage'),
(728, 'Wisconsin Physicians Service Insurance Corporation', 'medical', 'WPS', 'wisconsinphysiciansserviceinsurancecorporation-wps');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `insurance`
--
-- ALTER TABLE `insurance`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `id` (`insurer`),
--   ADD KEY `IDX_INSURER` (`insurer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `insurance`
--
-- ALTER TABLE `insurance`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=739;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
