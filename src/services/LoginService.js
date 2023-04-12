import http from "../http-common.js";

class LoginService{
    employeeLogin(data){
        return http.post("/login",data); // it will return the result from login api
    }
    user(data){
        console.log("data" ,data)
        return http.post(`/user?email=${data.email}`,data); // it will return the result from login api

    }
    setup(data,id){
        console.log("data" ,data)
        return http.post(`user/${id}/setup?password=${data.password}`,data); // it will return the result from login api

    }

}

export default new LoginService();
