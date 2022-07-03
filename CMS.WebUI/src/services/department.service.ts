// importing GET,POST,PUT method from Common Service file
import { Get, Post, Put } from './common.service';
// importing models from master type file
import {  DepartmentModel, LectureModel } from '../types/master.type';


export const DepartmentService = {
    // this function will make async call to API and get a department and its lectures by id
    getDepartmentByID: async (departmentID: string): Promise<DepartmentModel> => {
        return await Get('department/' + departmentID).then(x => {
            if (x.status == 200) {
                return x.data.department;
            }
            else {
                return [];
            }
        });
    },
    // this method will make async call to API and get all departments
    getAllDepartments: async (): Promise<DepartmentModel[]> => {
        return await Get('department').then(x => {
            if (x.status == 200) {
                return x.data.departments;
            }
            else {
                return [];
            }
        });
    },
        // this method will make async call to API and update lectures of a department
    updateDepartmentLectures: async (payload): Promise<boolean> => {
        return await Put('department/' + payload.Id, payload.lectures).then(x => {
            if (x.status == 200) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    
}
