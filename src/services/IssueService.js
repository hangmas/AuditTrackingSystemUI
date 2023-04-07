import http from "../http-common.js";

class IssueService {

    getIssues(){
        return http.get(`/issue`);
    }

    createIssue(data){
        return http.post("/issue",data);
    }
}

export default new IssueService();