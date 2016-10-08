-- ---
-- Table 'Insurance_company'
--
-- ---

-- DROP TABLE IF EXISTS `Insurance_company`;

CREATE TABLE `Insurance_company` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `company_name` VARCHAR(100) NULL,
  `phone_number_for_patients` VARCHAR(20) NULL,
  `phone_number_for_institutions` VARCHAR(20) NULL,
  PRIMARY KEY (`id`)
);
