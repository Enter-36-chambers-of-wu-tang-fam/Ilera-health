-- ---
-- Table 'company_insurance_plan_types'
--
-- ---

-- DROP TABLE IF EXISTS `company_insurance_plan_types`;

CREATE TABLE `company_insurance_plan_types` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_insurance` INTEGER DEFAULT NULL,
  `id_Insurance_company` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
