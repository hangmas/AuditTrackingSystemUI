import http from "../http-common.js";

class IssueService {

    getIssues(){
        return http.get(`/issuess`);
    }

    createIssue(data){
        return http.post("/issuess",data);
    }

    createIssueAction(id,data){
        return http.post(`/issuess/${id}/actions`,data)
    }

    getIssueActions(id){
        return http.get(`/issues/${id}/actions`)
    }

    updateIssuesAndActions(data){
        return http.put("/issues",data)
    }

    deleteIssue(id){
        return http.delete(`/issues/${id}`)
    }

}

export default new IssueService();