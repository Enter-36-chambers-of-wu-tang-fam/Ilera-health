'use strict'

const db = require('../db/dbConnect/connection.js');

module.exports = {

  getAll_patientInfo: (params, cb) => {
    let data = [params.uid];
    const queryString = 'SELECT p.id, p.first, p.last, p.middle, \
      p.maiden, p.email, p.date_of_birth, p.birth_city, p.birth_country, \
      p.marital_status, p.address, p.city, p.state, p.zip, \
      p.primary_phone_number, p.secondary_phone_number, p.gender, \
      p.weight, p.height, p.blood_type, p.conditions, p.procedures, \
      p.medications, p.allergies, p.primary_language, \
      p.secondary_language, p.photo_path, py.id, py.betterDoctorUID, \
      py.first, py.last, py.email, py.phone_number, py.photo_path, \
      py.specialty, a.id, a.date, a.time, a.notes, a.id_physician, \
      a.id_patient, a.id_institution, ad.id, ad.document, \
      ad.id_appointment, ip.id, ip.betterDoctorUID, ip.primary_name, \
      ip.primary_phone, ip.primary_address, ip.primary_city, \
      ip.primary_state, ip.primary_zip, ip.insurer1, \
      ip.insurance_type1, ip.insurance_network1, ip.policy_number1, \
      ip.insurer2, ip.insurance_type2, ip.insurance_network2, \
      ip.policy_number2, ip.member_id, ip.payer_id, ip.id_patient, \
      ip.id_insurance_company, ec.id, ec.e_1_contact_first, \
      ec.e_1_contact_last, ec.e_1_contact_phone, ec.e_1_contact_email, \
      ec.e_1_contact_relationship, ec.e_2_contact_first, \
      ec.e_2_contact_last, ec.e_2_contact_phone, ec.e_2_contact_email, \
      ec.e_2_contact_relationship, ec.id_patient, pm.id, pm.drug_name, \
      pm.dosage, pm.id_medication, pm.id_physician, pm.id_patient, \
      pm.start_date, pm.end_date, pay.id, pay.copay, pay.bill, \
      pay.bill_statement, pay.due_date, pay.id_physician, \
      pay.id_patient, hl.id, hl.physician_date, hl.physician_notes, \
      hl.physician_photo_path, hl.patient_date, hl.patient_note, \
      hl.patient_photo_path, hl.id_physician, hl.id_patient, \
      r.id, r.betterDoctorUID, r.id_physician, r.id_patient \
      FROM patient p \
      JOIN patient_physician r \
      ON r.id_patient = p.id \
      JOIN physician py \
      ON py.id = r.id_physician \
      JOIN appointment a \
      ON a.id_patient = p.id \
      JOIN appointment_document ad \
      ON ad.id_appointment = a.id \
      JOIN insurance_plan ip \
      ON ip.id_patient = p.id \
      JOIN emergency_contact ec \
      ON ec.id_patient = p.id \
      JOIN patient_medication pm \
      ON pm.id_patient = p.id \
      JOIN payment pay \
      ON pay.id_patient = p.id \
      JOIN health_log hl \
      ON hl.id_patient = p.id \
      WHERE p.id=?';
    db.query(queryString, (error, results) => cb(error, results) );
  }

};
// SELECT p.id, p.first, p.last, p.middle, p.maiden, p.email, p.date_of_birth, p.birth_city, p.birth_country, p.marital_status, p.address, p.city, p.state, p.zip, p.primary_phone_number, p.secondary_phone_number, p.gender, p.weight, p.height, p.blood_type, p.conditions, p.procedures, p.medications, p.allergies, p.primary_language, p.secondary_language, p.photo_path, py.id, py.betterDoctorUID, py.first, py.last, py.email, py.phone_number, py.photo_path, py.specialty, a.id, a.date, a.time, a.notes, a.id_physician, a.id_patient, a.id_institution, ad.id, ad.document, ad.id_appointment, ip.id, ip.betterDoctorUID, ip.primary_name, ip.primary_phone, ip.primary_address, ip.primary_city, ip.primary_state, ip.primary_zip, ip.insurer1, ip.insurance_type1, ip.insurance_network1, ip.policy_number1, ip.insurer2, ip.insurance_type2, ip.insurance_network2, ip.policy_number2, ip.member_id, ip.payer_id, ip.id_patient, ip.id_insurance_company, ec.id, ec.e_1_contact_first, ec.e_1_contact_last, ec.e_1_contact_phone, ec.e_1_contact_email, ec.e_1_contact_relationship, ec.e_2_contact_first, ec.e_2_contact_last, ec.e_2_contact_phone, ec.e_2_contact_email, ec.e_2_contact_relationship, ec.id_patient, pm.id, pm.drug_name, pm.dosage, pm.id_medication, pm.id_physician, pm.id_patient, pm.start_date, pm.end_date, pay.id, pay.copay, pay.bill, pay.bill_statement, pay.due_date, pay.id_physician, pay.id_patient, hl.id, hl.physician_date, hl.physician_notes, hl.physician_photo_path, hl.patient_date, hl.patient_note, hl.patient_photo_path, hl.id_physician, hl.id_patient, r.id, r.betterDoctorUID, r.id_physician, r.id_patient FROM patient p JOIN patient_physician r ON r.id_patient = p.id JOIN physician py ON py.id = r.id_physician JOIN appointment a ON a.id_patient = p.id JOIN appointment_document ad ON ad.id_appointment = a.id JOIN insurance_plan ip ON ip.id_patient = p.id JOIN emergency_contact ec ON ec.id_patient = p.id JOIN patient_medication pm ON pm.id_patient = p.id JOIN payment pay ON pay.id_patient = p.id JOIN health_log hl ON hl.id_patient = p.id WHERE p.id= 1;


// +----+-------+------+--------+--------+--------+---------------+------------+---------------+----------------+---------+------+-------+-------+----------------------+------------------------+--------+--------+--------+------------+------------+------------+-------------+-----------+------------------+--------------------+------------+----+-----------------+--------+------+-------+--------------+------------+-----------+----+------------+----------+----------------------------+--------------+------------+----------------+----+----------+----------------+----+-----------------+--------------+---------------+-----------------+--------------+---------------+-------------+----------+-----------------+--------------------+----------------+----------+-----------------+--------------------+----------------+-----------+----------+------------+----------------------+----+-------------------+------------------+-------------------+-------------------+--------------------------+-------------------+------------------+-------------------+-------------------+--------------------------+------------+----+-----------+--------+---------------+--------------+------------+------------+----------+----+-------+------+----------------+----------+--------------+------------+----+----------------+----------------------+----------------------+--------------+--------------+--------------------+--------------+------------+----+-----------------+--------------+------------+
// | id | first | last | middle | maiden | email  | date_of_birth | birth_city | birth_country | marital_status | address | city | state | zip   | primary_phone_number | secondary_phone_number | gender | weight | height | blood_type | conditions | procedures | medications | allergies | primary_language | secondary_language | photo_path | id | betterDoctorUID | first  | last | email | phone_number | photo_path | specialty | id | date       | time     | notes                      | id_physician | id_patient | id_institution | id | document | id_appointment | id | betterDoctorUID | primary_name | primary_phone | primary_address | primary_city | primary_state | primary_zip | insurer1 | insurance_type1 | insurance_network1 | policy_number1 | insurer2 | insurance_type2 | insurance_network2 | policy_number2 | member_id | payer_id | id_patient | id_insurance_company | id | e_1_contact_first | e_1_contact_last | e_1_contact_phone | e_1_contact_email | e_1_contact_relationship | e_2_contact_first | e_2_contact_last | e_2_contact_phone | e_2_contact_email | e_2_contact_relationship | id_patient | id | drug_name | dosage | id_medication | id_physician | id_patient | start_date | end_date | id | copay | bill | bill_statement | due_date | id_physician | id_patient | id | physician_date | physician_notes      | physician_photo_path | patient_date | patient_note | patient_photo_path | id_physician | id_patient | id | betterDoctorUID | id_physician | id_patient |
// +----+-------+------+--------+--------+--------+---------------+------------+---------------+----------------+---------+------+-------+-------+----------------------+------------------------+--------+--------+--------+------------+------------+------------+-------------+-----------+------------------+--------------------+------------+----+-----------------+--------+------+-------+--------------+------------+-----------+----+------------+----------+----------------------------+--------------+------------+----------------+----+----------+----------------+----+-----------------+--------------+---------------+-----------------+--------------+---------------+-------------+----------+-----------------+--------------------+----------------+----------+-----------------+--------------------+----------------+-----------+----------+------------+----------------------+----+-------------------+------------------+-------------------+-------------------+--------------------------+-------------------+------------------+-------------------+-------------------+--------------------------+------------+----+-----------+--------+---------------+--------------+------------+------------+----------+----+-------+------+----------------+----------+--------------+------------+----+----------------+----------------------+----------------------+--------------+--------------+--------------------+--------------+------------+----+-----------------+--------------+------------+
// |  1 | bal   | bon  | NULL   | NULL   | afsjon | NULL          | NULL       | NULL          | NULL           | mya     | at   | ca    | 43522 | 2435                 | NULL                   | NULL   |   1231 |    123 | 4          | NULL       | NULL       | NULL        | NULL      | NULL             | NULL               | a          |  1 | NULL            | neekon | nee  | nee   | 34214321     | nee        | nee       |  1 | 2016-10-20 | 00:02:30 | needs to protect his kneck |            1 |          1 |              1 |  1 | yolo     |              1 |  1 | NULL            | yolo         | 4325          | NULL            | NULL         | NULL          | NULL        | NULL     | NULL            | NULL               | NULL           | NULL     | NULL            | NULL               | NULL           | NULL      | NULL     |          1 |                    1 |  1 | helen             | yara             | 1234              | yolomail          | momma                    | NULL              | NULL             | NULL              | NULL              | NULL                     |          1 |  1 | kush      | enough |             1 |            1 |          1 | NULL       | NULL     |  1 |   342 | 1423 | 142            | NULL     |            1 |          1 |  1 | NULL           | he needs to shape up | upyours              | NULL         | doctor sucks | yolo               |            1 |          1 |  1 | NULL            |            1 |          1 |
// |  1 | bal   | bon  | NULL   | NULL   | afsjon | NULL          | NULL       | NULL          | NULL           | mya     | at   | ca    | 43522 | 2435                 | NULL                   | NULL   |   1231 |    123 | 4          | NULL       | NULL       | NULL        | NULL      | NULL             | NULL               | a          |  2 | NULL            | yolo   | bee  | bee   | 34321235     | bee        | bee       |  1 | 2016-10-20 | 00:02:30 | needs to protect his kneck |            1 |          1 |              1 |  1 | yolo     |              1 |  1 | NULL            | yolo         | 4325          | NULL            | NULL         | NULL          | NULL        | NULL     | NULL            | NULL               | NULL           | NULL     | NULL            | NULL               | NULL           | NULL      | NULL     |          1 |                    1 |  1 | helen             | yara             | 1234              | yolomail          | momma                    | NULL              | NULL             | NULL              | NULL              | NULL                     |          1 |  1 | kush      | enough |             1 |            1 |          1 | NULL       | NULL     |  1 |   342 | 1423 | 142            | NULL     |            1 |          1 |  1 | NULL           | he needs to shape up | upyours              | NULL         | doctor sucks | yolo               |            1 |          1 |  4 | NULL            |            2 |          1 |
// +----+-------+------+--------+--------+--------+---------------+------------+---------------+----------------+---------+------+-------+-------+----------------------+------------------------+--------+--------+--------+------------+------------+------------+-------------+-----------+------------------+--------------------+------------+----+-----------------+--------+------+-------+--------------+------------+-----------+----+------------+----------+----------------------------+--------------+------------+----------------+----+----------+----------------+----+-----------------+--------------+---------------+-----------------+--------------+---------------+-------------+----------+-----------------+--------------------+----------------+----------+-----------------+--------------------+----------------+-----------+----------+------------+----------------------+----+-------------------+------------------+-------------------+-------------------+--------------------------+-------------------+------------------+-------------------+-------------------+--------------------------+------------+----+-----------+--------+---------------+--------------+------------+------------+----------+----+-------+------+----------------+----------+--------------+------------+----+----------------+----------------------+----------------------+--------------+--------------+--------------------+--------------+------------+----+-----------------+--------------+------------+
