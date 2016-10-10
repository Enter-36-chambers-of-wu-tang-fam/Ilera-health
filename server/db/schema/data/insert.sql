
-- ---
-- Data For Testing Purposes
-- ---

-- INSERT INTO `physician` (`id`,`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES
-- ('','','','','','','','');
INSERT INTO `physician` (`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES ('neekon','nee','nee','34214321','nee','nee','nee');

INSERT INTO `physician` (`first`,`last`,`email`,`phone_number`,`password`,`photo_path`,`specialty`) VALUES ('yolo','bee','bee','34321235','bee','bee','bee');
-- INSERT INTO `patient` (`id`,`first`,`last`,`email`,`password`,`pin`,`date_of_birth`,`address`,`city`,`state`,`zip`,`phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES
-- ('','','','','','','','','','','','','','','','');
INSERT INTO `patient` (`first`,`last`,`email`,`password`,`pin`,`address`,`city`,`state`,`zip`,`primary_phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES ('bal','bon','afsjon','2345rew','14','mya','at','ca','43522','2435','1231','123','4','a');
INSERT INTO `patient` (`first`,`last`,`email`,`password`,`pin`,`address`,`city`,`state`,`zip`,`primary_phone_number`,`weight`,`height`,`blood_type`,`photo_path`) VALUES ('abn','bon','jon','2345rew','14','mj','sarat','ca','43522','2435','1231','123','4','a');


-- INSERT INTO `patient_physician` (`id`,`id_physician`,`id_patient`) VALUES
-- ('','','');
-- INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('1','1');
-- INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('1','2');
-- INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('2','2');
-- INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('2','1');
-- INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('2','7');
-- INSERT INTO `patient_physician` (`id_physician`,`id_patient`) VALUES ('1','7');

-- INSERT INTO `institution` (`id`,`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES
-- ('','','','','','','','','','','');
INSERT INTO `institution` (`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES ('wu tang','36chambers','fixer','12','1423','2413','sanjose','ca','4231','wu@gmail');
INSERT INTO `institution` (`inst_name`,`type`,`description`,`rating`,`phone_number`,`address`,`city`,`state`,`zip`,`email`) VALUES ('gza','chamberlane','tester','54','3542','4123','frisco','va','4231','wafsdu@gmail');

-- INSERT INTO `physician_institution` (`id`,`id_institution`,`id_physician`) VALUES
-- ('','','');
-- INSERT INTO `physician_institution` (`id_institution`,`id_physician`) VALUES ('1','1');
-- INSERT INTO `physician_institution` (`id_institution`,`id_physician`) VALUES ('1','2');
INSERT INTO `physician_institution` (`id_institution`,`id_physician`, `betterDoctorUID`) VALUES ('1','1', 'a674d2db5a5b8349ea5ade900b18792b');
INSERT INTO `physician_institution` (`id_institution`,`id_physician`, `betterDoctorUID`) VALUES ('1','2', '5ba35169e6bc6d86d8c2ffbd182aa621');
-- a674d2db5a5b8349ea5ade900b18792b
-- 5ba35169e6bc6d86d8c2ffbd182aa621

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
INSERT INTO `emergency_contact` (`e_1_contact_first`,`e_1_contact_last`,`e_1_contact_phone`,`e_1_contact_email`,`e_1_contact_relationship`,`id_patient`) VALUES ('helen','yara','1234','yolomail','momma','1');

-- INSERT INTO `medication` (`id`,`drug_name`,`details`) VALUES
-- ('','','');




-- INSERT INTO `appointment` (`date`,`time`,`notes`,`id_physician`,`id_patient`,`id_institution`) VALUES ('2016-10-20','230','needs to protect his kneck','1','1','1');

-- INSERT INTO `appointment_document` (`document`,`id_appointment`) VALUES ('yolo','1');

-- INSERT INTO `Insurance_company` (`company_name`,`phone_number_for_patients`,`phone_number_for_institutions`) VALUES
-- ('jojo','1423','1423');

-- INSERT INTO `insurance_plan` (`primary_name`, `primary_phone`, `id_patient`, `id_insurance_company`) VALUES ('yolo', '4325', '1', '1');

-- INSERT INTO `payment` (`copay`,`bill`,`bill_statement`,`id_physician`,`id_patient`) VALUES ('342','1423','142','1','1');

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

-- --

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
