-- ---
-- Table 'messages'
--
-- ---

-- DROP TABLE IF EXISTS `messages`;

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
