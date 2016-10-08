-- ---
-- Table 'insurance_company_professional'
-- this is for the insurance professionals to have a user profile to monitor customer bills and such
-- ---

-- DROP TABLE IF EXISTS `insurance_company_professional`;

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
