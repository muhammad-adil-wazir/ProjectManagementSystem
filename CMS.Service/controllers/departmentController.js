const Department = require("../models/department");
const { ResultNotFoundError } = require("../errors");
const ObjectId = require("mongoose/lib/types/objectid");

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
const updateDepartmentLectures = async (req, res, next) => {
  //const department = await Department.find( {'_id':ObjectId(req.params.id)});
  try {
    let department = await Department.findById(req.params.id);
    if (department) {
      department.lectures = req.body;

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
