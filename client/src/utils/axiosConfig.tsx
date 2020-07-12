import {AxiosRequestConfig} from 'axios'
export const getConfig = (type: string): AxiosRequestConfig | undefined => {
         if (type === "admin") {
           const token = localStorage.getItem("adminToken");
           return { headers: { AdminAuthorization: "Bearer " + token } };
         } else if (type === "user") {
           const token = localStorage.getItem("userToken");
           return { headers: { UserAuthorization: "Bearer " + token } };
         }
       };
