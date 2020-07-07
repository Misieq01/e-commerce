export const userConfig = {headers : { UserAuthorization: "Bearer " + localStorage.getItem('userToken') }};
export const adminConfig = {headers : { AdminAuthorization: "Bearer " + localStorage.getItem('adminToken') }};
