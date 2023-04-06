import http from "../http-common.js";

class IssueService {

    getIssues(){
        return http.get(`/issue`);
    }

    createIssue(){
        
    }
}

export default new IssueService();