const Relation = require('.././models/institution_staff-helpers.js');


module.exports = {

  postRelation: (req, res) => {
    Relation.post_relation(req.body, (err,data)=>{
      if(err) console.log(err);
      res.json(data);
    });
  }


  // (req, res) => {
  //   Relation.post_relation(req.body, (err,data)=>{
  //     if(err) console.log(err);
  //     res.json(data);
  //   });
  // }
};
