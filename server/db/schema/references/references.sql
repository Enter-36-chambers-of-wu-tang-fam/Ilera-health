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
