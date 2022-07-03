// importing GET,PUT method from common service
import { Get, Post, Put } from './common.service';
// importing types from master type
import { LectureModel, StudentModel } from '../types/master.type';


export const UserService = {
    // this method get user data from API by id
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
    // this method makes aync call to API and load update all lectures of a user
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
