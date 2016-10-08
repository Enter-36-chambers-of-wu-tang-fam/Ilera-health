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
