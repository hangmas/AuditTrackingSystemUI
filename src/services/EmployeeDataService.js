import http from "../http-common";

class EmployeeDataService{

    get(){
      //  return http.get(`/employees/${eid}`);
      return http.get(`/employees`);
    }

    getAllEmployees(){
      return http.get('/employees',{params: {
        nonAuditEmployee: false
      }})
    }

    getAuditee()
    {
    return http.get(`/auditors`);
    }
}

export default new EmployeeDataService();