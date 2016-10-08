-- ---
-- Table 'insurance_plan'
-- these are the individual plans the insurance companies offer patients
-- --- one to one relation for each patients to each plan

-- DROP TABLE IF EXISTS `insurance_plan`;

CREATE TABLE `insurance_plan` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `betterDoctorUID` VARCHAR(60) NULL,
  `primary_name` VARCHAR(30) NULL,
  `primary_phone` VARCHAR(30) NULL,
  `primary_address` VARCHAR(30) NULL,
  `primary_city` VARCHAR(30) NULL,
  `primary_state` VARCHAR(30) NULL,
  `primary_zip` VARCHAR(30) NULL,
  `insurer1` VARCHAR(100) NULL,
  `insurance_type1` VARCHAR(100) NULL,
  `insurance_network1` VARCHAR(100) NULL,
  `policy_number1` VARCHAR(100) NULL DEFAULT NULL,
  `insurer2` VARCHAR(100) NULL,
  `insurance_type2` VARCHAR(100) NULL,
  `insurance_network2` VARCHAR(100) NULL,
  `policy_number2` VARCHAR(100) NULL DEFAULT NULL,
  `member_id` VARCHAR(30) NULL,
  `payer_id` VARCHAR(20) NULL,
  `id_patient` INTEGER DEFAULT NULL,
  `id_insurance_company` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
