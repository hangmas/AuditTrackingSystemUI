<template>
<div>
    <h2>Current Issues</h2>
    <label for="department-filter">Filter by department: </label>
    <select id="department-filter" v-model="selectedDepartment">
      <option value="">All departments</option>
      <option v-for="(department, index) in departments" :key="index" :value="department">{{ department }}</option>
    </select>
    <table border="1">
    <tr><th>Report Title</th><th>Issue Title</th><th>Issue Date</th><th>Risk Rating</th><th>Departement Responsible</th><th>Approved Deadline</th></tr>
    <tr v-for="(issue, index) in filteredIssues" :key="index">

          <td>{{ issue.reportTitle }}</td>
          <td>{{ issue.issueTitle }}</td>
          <td>{{ issue.issueDate }}</td>
          <td>{{ issue.riskRating }}</td>
          <td>{{ issue.department }}</td>
        </tr>
</table>
</div>
<br><br>
<div>
    <h2>Outstanding Issues</h2>
    <table border="1">
    <tr><th>Report Title</th><th>Issue Title</th><th>Issue Date</th><th>Risk Rating</th><th>Departement Responsible</th><th>Approved Deadline</th></tr>
    <tr v-for="(issue, index) in issues" :key="index">
          <td>{{ issue.reportTitle }}</td>
          <td>{{ issue.issueTitle }}</td>
          <td>{{ issue.issueDate }}</td>
          <td>{{ issue.riskRating }}</td>
          <td>{{ issue.department }}</td>
        </tr>
</table>
</div>
<div>
  <p v-for="(item, index) in filteredEmp" :key="index" :value="firstName">{{ item.firstName }}</p>
</div>
<div>
  <ul>
    <li v-for="(employee, index) in employee" :key="index">{{ employee.firstName }}</li>
    </ul>
  </div>
</template>
<script>
import EmployeeDataService from '../services/EmployeeDataService'

export default{

name: 'dashboardAuditor',
data()
{
    return{
      
        issues: [
        {
          reportTitle: "Audit of Compliance Department",
          issueTitle: "Lack of Standard Operating Procedure Documentation",
          issueDate : "2022/10/29",
          riskRating: "Low",
          department : "Information Technology"
        },
        {
          reportTitle: "Audit of Finance Department",
          issueTitle: "Inaccurate Financial Reporting",
          issueDate : "2022/10/30",
          riskRating : "High",
          department : "Compliance"
        },
      ],
      selectedDepartment: "",
      employee : [],
      firstName : ""
    }

},

  methods :{
    retrieveEmployee(){

           EmployeeDataService.get()
            .then(response =>{
                this.employee = response.data; //employee will save all the data 
               this.firstNames = response.data;
    //            this.firstNames.push(this.employee.firstName);           
     //           console.log(this.firstNames);
            })

            .catch(error =>{
                console.log(error);
            })
        }



  },

  computed: {
    departments() {
      // get a list of all departments from the issues array
      const departments = new Set();
      for (const issue of this.issues) {
        departments.add(issue.department);
      }
      return Array.from(departments);
    },
    filteredIssues() {
      // filter the issues array based on the selected department
      if (this.selectedDepartment) {
        return this.issues.filter((issue) => issue.department === this.selectedDepartment);
      } else {
        return this.issues;
      }
    },
    
    filteredEmp()
    {

      return this.employee.filter((employee) => employee.firstName === "Shilpa")
    }
    
  },

  mounted()
  {
    this.retrieveEmployee();

  }
};

</script>