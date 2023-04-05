import http from "../http-common";

class EmployeeDataService{

    get(){
      //  return http.get(`/employees/${eid}`);
      return http.get(`/employees`);
    }
}

export default new EmployeeDataService();