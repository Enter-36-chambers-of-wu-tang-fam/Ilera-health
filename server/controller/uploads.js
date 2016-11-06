const Patient = require("../models/patient-helpers");
const MedRecord = require("../models/med_record-helpers.js");

module.exports = {

	profile_photo: (req,res, next) => {
		let data = {photo_path: `/src/uploads/profile/${req.file.filename}`, uid: req.params.uid};
		Patient.delete_photo(data, (error, result) => {
			console.log("Result", result);
			if(error) console.log(error);
				Patient.update_photo(data,(err,update)=>{
					if(err) console.log("UPDATE PHOTO ERROR", err);
					res.json(update);
				});
		});
	},

	med_records: (req,res, next) => {
  	req.body.document_path = `/src/uploads/old_records/${req.file.filename}`;
   	req.body.uid = req.params.uid;
  	MedRecord.upload_document(req.body, (error, result) => {
    	if(error) console.log("UPLOAD RECORDS ERROR", error);
    	res.json(result);
  	})
	},

	appointment: (req,res, next) => {
  	let data = {photo_path: `../../src/uploads/appointment/${req.file.filename}`, uid: req.params.uid};
  	Patient.update_appointment(data,(err,data)=>{
      res.json(data);
  	});
	}	
};