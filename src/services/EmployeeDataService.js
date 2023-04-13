import http from "../http-common";

class EmployeeDataService{
    //List of employees who are AuditEmployees
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

    postEmployeeRole(employees){
      return http.post(`/auditors`, employees)
    }
}

export default new EmployeeDataService();