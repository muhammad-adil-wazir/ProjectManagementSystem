import { Get, Post, Put } from './common.service';
import {  DepartmentModel, LectureModel } from '../types/master.type';
import { number } from 'zod';


export const DepartmentService = {

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
