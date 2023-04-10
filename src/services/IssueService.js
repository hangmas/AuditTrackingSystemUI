import http from "../http-common.js";

class IssueService {

    getIssues(){
        return http.get(`/issue`);
    }

    createIssue(data){
        return http.post("/issue",data);
    }

    createIssueAction(id,data){
        return http.post(`/issue/${id}/action`,data)
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