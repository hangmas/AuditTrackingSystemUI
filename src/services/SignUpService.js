import http from "../http-common";

class SignUpService{
    signUp(data){
        return http.post("/user/{id}/setup",data); // it will return the result from login api

    }
}

export default new SignUpService();