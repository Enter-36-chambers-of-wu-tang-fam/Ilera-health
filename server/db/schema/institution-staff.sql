-- ---
-- Table 'institution_staff'
--
-- ---

-- DROP TABLE IF EXISTS `institution_staff`;

CREATE TABLE `institution_staff` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_staff` INTEGER DEFAULT NULL,
  `id_institution` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);
