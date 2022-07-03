import { Profile } from '../types/profile.type';

export const  ProfileService = {
    
    setProfile : (profile: Profile) => {
        if (profile != undefined) {
            localStorage.setItem('UserID', profile.UserID);
            localStorage.setItem('UserName', profile.UserName);
            localStorage.setItem('RoleID', profile.RoleID.toString());
            localStorage.setItem('Token', profile.Token.toString());
            localStorage.setItem('DepartmentID', profile.DepartmentID);
        }
    },
    resetProfile: () => {
        localStorage.removeItem('UserID');
        localStorage.removeItem('UserName');
        localStorage.removeItem('RoleID');
        localStorage.removeItem('Token');
        localStorage.removeItem('DepartmentID');
    },
    getProfile: () => {
        if (localStorage.getItem('Token')) {
            let profile: Profile = {
                UserID: localStorage.getItem('UserID')!,
                UserName: localStorage.getItem('UserName')!,
                RoleID: parseInt(localStorage.getItem('RoleID')!),
                Token: localStorage.getItem('Token')!,
                DepartmentID: localStorage.getItem('DepartmentID')!,
            };
            return profile;
        }
        else {
            return undefined;
        }
    },
    isAuthencticated : () => {
        return localStorage.getItem('Token') != null;
    }

}