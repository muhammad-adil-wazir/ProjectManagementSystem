// importing GET, POST method from common service
import { Get, Post } from './common.service';
// importing types from master type fle
import { LectureModel, DepartmentModel } from '../types/master.type';


export const LectureService = {
        // this method will make async call to API and get all lectures
    getAllLectures: async (): Promise<LectureModel[]> => {
        return await Get('lecture').then(x => {
            if (x.status == 200) {
                return x.data.lectures;
            }
            else {
                return [];
            }
        });
    },
        // this method will make async call to API and get all lectures for a department
    getAllLectureByDepartmentID: async (departmentID: string): Promise<LectureModel[]> => {
        return await Get('lecture/' + departmentID).then(x => {
            if (x.status == 200) {
                return x.data.lectures;
            }
            else {
                return [];
            }
        });
    },


    
}
