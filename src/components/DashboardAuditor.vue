<template>
<div>
    <h2>Outstanding Issues</h2>
    <label for="department-filter">Filter by department: </label>
    <select id="department-filter" v-model="selectedDepartment">
      <option value="">All departments</option>
      <option v-for="(department, index) in departments" :key="index" :value="department">{{ department }}</option>
    </select>
    <table class="issuelisttable">
    <tr>
      <th>Report Title</th>
      <th>Issue Title</th>
      <th>Issue Date</th>
      <th>Risk Rating</th>
      <th>Departement Responsible</th>
      <th>Approved Deadline</th>
      <th>Status</th>
    </tr>
    <tr v-for="(item, index) in filteredIssues" :key="index">

          <td>{{ item.reportTitle }}</td>
          <td>{{ item.issueTitle }}</td>
          <td>{{ item.issueDate }}</td>
          <td>{{ item.riskRating }}</td>
          <td>{{ item.departmentResponsible }}</td>
          <td>{{ item.approvedDeadline }}</td>
          <td>{{ item.status }}</td>
        </tr>
</table>
</div>
<br><br>
<div>
    <h2>Closed Issues</h2>
    <table border="1">
    <tr><th>Report Title</th><th>Issue Title</th><th>Issue Date</th><th>Risk Rating</th><th>Departement Responsible</th><th>Approved Deadline</th></tr>
    <tr v-for="(item, index) in issuesList" :key="index">
          <td>{{ item.reportTitle }}</td>
          <td>{{ item.issueTitle }}</td>
          <td>{{ item.issueDate }}</td>
          <td>{{ item.riskRating }}</td>
          <td>{{ item.departmentResponsible }}</td>
          <td>{{ item.approvedDeadline }}</td>
        </tr>
</table>
</div>

<div>
    <p>Timestamp: {{ timestamp }}</p>
    <p>Date: {{ date }}</p>
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
import IssueService from '../services/IssueService'

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
      issuesList:[],
      issuesOutstanding :[],
      firstName : "",
      timestamp: 1627266200000, // sample timestamp value
      date: '', // variable to hold the date value
    }

},

  methods :{
    retrieveEmployee(){

           EmployeeDataService.get()
            .then(response =>{
                this.employee = response.data; //employee will save all the data 
    //            this.firstNames.push(this.employee.firstName);           
     //           console.log(this.firstNames);
            })

            .catch(error =>{
                console.log(error);
            })
        },

        retrieveIssue(){
        IssueService.getIssues()
            .then(response =>{
                this.issuesList = response.data;
                console.log(this.issuesList);
                
                this.issuesList.forEach(issue => {
                const date = new Date(issue.issueDate);
                issue.issueDate = date.toLocaleDateString(); // update issueDate to the formatted date string
          });

          this.issuesList.forEach(issue => {
                const date = new Date(issue.approvedDeadline);
                issue.approvedDeadline = date.toLocaleDateString(); // update approvedDateline to the formatted date string
          });

            })
            .catch(error => {
                console.log(error);
            })
    }



  },

  computed: {
    departments() {
      // get a list of all departments from the issues array
      const departments = new Set();
      for (const item of this.issuesList) {
      departments.add(item.departmentResponsible);
      }
      return Array.from(departments);
    },
    // filteredIssues() {
    //   if (this.selectedDepartment) {
    //     return this.issuesList.filter((issue) => issue.departmentResponsible === this.selectedDepartment);
    //   } else {
    //     return this.issuesList;
    //   }
    // },

    filteredIssues() { //Filter the issue list based on the departement and the status of the issue
  if (this.selectedDepartment) {
    return this.issuesList.filter((issue) => {
      return issue.departmentResponsible === this.selectedDepartment && issue.status === 'Outstanding';
    });
  } else {
    return this.issuesList.filter((issue) => {
      return issue.status === 'Outstanding';
    });
  }
},

filteredIssues2() {
  if (this.selectedDepartment) {
    return this.issuesList.filter((issue) => {
      return issue.departmentResponsible === this.selectedDepartment && issue.status === 'Closed';
    });
  } else {
    return this.issuesList.filter((issue) => {
      return issue.status === 'Closed';
    });
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
    this.retrieveIssue();
    this.date = new Date(this.timestamp).toLocaleString(); // convert timestamp to date


  }
};

</script>

<style scoped>
    table.issuelisttable {
        border:10px;
        
        
    }
    table.issuelisttable th {
        border: 1px;
        border-style: solid;
        border-color: gray;
        background-color:lightcyan;
    }

    table.issuelisttable td {
        border: 1px;
        border-style: solid;
        border-color: gray;
        
    }



</style>