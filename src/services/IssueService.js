import http from "../http-common.js";
import EmployeeDataService from "./EmployeeDataService.js";

class IssueService {

    getIssues() {
        return http.get(`/issues`);
    }

    createIssue(data) {
        return http.post("/issues", data);
    }

    createIssueAction(id, data) {
        return http.post(`/issues/${id}/actions`, data)
    }

    getIssueActions(id) {
        return http.get(`/issues/${id}/actions`)
    }

    updateIssuesAndActions(data) {
        return http.put("/issues", data)
    }

    deleteIssue(id) {
        return http.delete(`/issues/${id}`)
    }

    // getIssuesByStatus(status, yearly){
    //     return http.get('/issues',null,{params:{
    //         status: status,
    //         yearly: yearly
    //     }})
    // }

    getIssuesByStatus(status, yearly) {
        return http.get('/issues', {
            params: {
                status,
                yearly
            }
        })
    }

    getIssuesByDepartment() {
        return new Promise((resolve, reject) => {
            EmployeeDataService.getAllEmployees()
                .then(response => {
                    const labels = response.data.map(emp => emp.department)
                        .filter((value, index, self) => self.indexOf(value) === index);
                        console.log(labels);
                    this.getIssues()
                        .then(response => {
                            const allIssues = response.data;
                            const totalIssues = allIssues.length;
                            console.log(`Count: ${totalIssues}`)
                            const data = [];
                            labels.forEach((dep) => {
                                let count = 0;
                                allIssues.forEach((x) => {
                                    count = x.departmentResponsible === dep ? count + 1 : count;
                                })
                                data.push((count / totalIssues) * 100);
                            });
                            let chartData = {
                                labels: labels,
                                datasets: [{
                                    label: "% of Total Department",
                                    backgroundColor: '#FFB034',
                                    data: data
                                }]
                            };
                            response.data = chartData;
                            resolve(response);
                        })
                        .catch(error => {
                            reject(error);
                        });

                })
                .catch(error => {
                    reject(error)
                });

        });
    }

    getIssuesByRiskRating() {
        return new Promise((resolve, reject) => {
            const labels = ["Low", "Medium", "High"];
            this.getIssues()
                .then(response => {
                    const allIssues = response.data;
                    const totalIssues = allIssues.length;
                    const data = [];
                    labels.forEach((dep) => {
                        let count = 0;
                        allIssues.forEach((x) => {
                            count = x.riskRating === dep ? count + 1 : count;
                        })
                        data.push((count / totalIssues) * 100);
                    });
                    let chartData = {
                        labels: labels,
                        datasets: [{
                            label: "% of Total Risk Rating",
                            backgroundColor: ['#FFDD26', '#FF681C','#CE2029'],
                            data: data
                        }]
                    };
                    response.data = chartData;
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        });
    }

}

export default new IssueService();