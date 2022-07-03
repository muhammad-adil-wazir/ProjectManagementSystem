import { Get, Post } from './common.service';
import { LectureModel, DepartmentModel } from '../types/master.type';


export const LectureService = {
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
