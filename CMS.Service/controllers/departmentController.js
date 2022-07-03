// loading department schema from models folder
const Department = require("../models/department");
const { ResultNotFoundError } = require("../errors");
// objectId is required to query database for any particular record
const ObjectId = require("mongoose/lib/types/objectid");

// this method return all departments along with its lectures
const getAllDepartments = async (req, res, next) => {
  const departs = await Department.find({}).populate('lectures').exec(function(err, departments){
    if(err){
      res.status(500).json({
        err
      });
    }
    res.status(200).json({
      departments,
    });
});;
  
};
// this method woll return department and its lectures based on id
// id will be received in request parameter
const getDepartmentByID = async (req, res, next) => {
  const depart = await Department.find( {'_id':ObjectId(req.params.id)}).populate('lectures').exec(function(err, department){
    if(err){
      res.status(500).json({
        err
      });
    }
    res.status(200).json({
      department,
    });
  });
};
// this method updates lectures of a department
// department id will be received in the request parameter
const updateDepartmentLectures = async (req, res, next) => {
  try {
    // query db to find department by id and update lectures 
    let department = await Department.findById(req.params.id);
    if (department) {
      // if department id not null then update its lectures from the request body
      department.lectures = req.body;
      // save changes in the database
      await department.save();
      res.status(200).json(department);
    } else {
      res.status(404).json({
        message: "department with given id not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentByID,
  updateDepartmentLectures
};
