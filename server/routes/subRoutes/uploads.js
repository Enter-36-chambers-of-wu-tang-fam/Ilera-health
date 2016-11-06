const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const storage = require('../../storage_paths/document_storage_paths.js');
const uploadProfile = multer({storage: storage.profile});
const uploadRecords = multer({storage: storage.oldRecords});
const uploadAppointment = multer({storage: storage.appointment});
const Uploads = require('../../controller/uploads.js');

module.exports = app => {
	// FILE UPLOAD PATHS

// Upload profile photo -> Only one photo stored per user

app.post('/upload/profile_picture/:uid', uploadProfile.single('upload'), Uploads.profile_photo);

// Upload Records Documents

app.post('/upload/old_records/:uid', uploadRecords.single('upload'), Uploads.med_records);

// Upload Appointment Documents

app.post('/upload/appointment_documents/:uid', uploadAppointment.single('upload'), Uploads.appointment);


}