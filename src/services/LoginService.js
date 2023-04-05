import http from "../http-common";

class LoginService{
    login(data){
        return http.post("/login",data); // it will return the result from login api

    }
}

export default new LoginService();
