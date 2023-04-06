import http from "../http-common.js";

class IssueService {

    getIssues(){
        return http.get(`/issue`);
    }
}

export default new IssueService();