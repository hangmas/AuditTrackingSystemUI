import http from "../http-common.js";

class IssueService {

    getIssues(){
        return http.get(`/issues`);
    }

    createIssue(data){
        return http.post("/issues",data);
    }

    createIssueAction(id,data){
        return http.post(`/issues/${id}/action`,data)
    }

    getIssueActions(id){
        return http.get(`/issue/${id}/action`)
    }

    updateIssuesAndActions(data){
        return http.put("/issue",data)
    }

    deleteIssue(id){
        return http.delete(`/issue/${id}`)
    }

}

export default new IssueService();