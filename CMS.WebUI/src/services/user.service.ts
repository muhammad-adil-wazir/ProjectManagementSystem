import { Get, Post, Put } from './common.service';
import { LectureModel, StudentModel } from '../types/master.type';


export const UserService = {
    getUserById: async (id:string): Promise<StudentModel[]> => {
        return await Get('user/' + id).then(x => {
            if (x.status == 200) {
                return x.data.user;
            }
            else {
                return [];
            }
        });
    },
    updateUserLectures: async (payload): Promise<boolean> => {
        return await Put('user/' + payload.Id, payload.lectures).then(x => {
            if (x.status == 200) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    
}
