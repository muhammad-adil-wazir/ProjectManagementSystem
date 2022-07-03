// loading header type from axios library to assign header to all requests
import { AxiosRequestHeaders } from "axios";
// calling profile service to get user profile
import { ProfileService } from './profile.service';
export default function authHeader(): AxiosRequestHeaders  {
    const _profile = ProfileService.getProfile();
    // if user is logged in the attach with requests
    if (_profile) {
        return {
            Authorization: 'Bearer ' + _profile.Token,
            UserID: _profile.UserID,
            RoleID: _profile.RoleID,
            ContentType: 'application/json;utf-8',
        };
    } else {
        return  {
          };
    }
}