import http from "../http-common.js";

class LoginService{
    employeeLogin(data){
        return http.post("/login",data); // it will return the result from login api
    }
}

export default new LoginService();
