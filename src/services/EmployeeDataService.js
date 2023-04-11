import http from "../http-common";

class EmployeeDataService{

    get(){
      //  return http.get(`/employees/${eid}`);
      return http.get(`/employees`);
    }

    getAuditee()
    {
    return http.get(`/auditors`);
    }
}

export default new EmployeeDataService();