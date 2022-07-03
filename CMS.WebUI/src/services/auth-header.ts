import { AxiosRequestHeaders } from "axios";
import { ProfileService } from './profile.service';
export default function authHeader(): AxiosRequestHeaders  {
    const _profile = ProfileService.getProfile();
    if (_profile) {
        return {
            Authorization: 'Bearer ' + _profile.Token,
            UserID: _profile.UserID,
            RoleID: _profile.RoleID,
            //"Content-Type": "multipart/form-data",
            ContentType: 'application/json;utf-8',
        };
    } else {
        return  {
          };
    }
}