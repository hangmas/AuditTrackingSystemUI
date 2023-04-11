<template>
  <div>
    <header>
      <h1>AUDIT ISSUES MONITORING SYSTEM</h1>
    </header>
    <nav>
      <ul class="nav-links">
    <li><Router-link to="" @click="toDashboard">Dashboard</Router-link></li>
    <li><Router-link to="" @click="toIssue">Issues</Router-link></li>
    <li><Router-link to="" @click="toReport">Report</Router-link></li>
    <li><Router-link to="" @click="toSettings">Settings</Router-link></li>
    <li><Router-link to="" @click="toLogout">Logout</Router-link></li>
  </ul>
  </nav>
  </div>
  <div>
      <h1>Auditee Dashboard</h1>
      <h2>Outstanding Issues</h2>
      <table class="issuelisttable">
      <tr>
        <th>Report Title</th>
        <th>Issue Title</th>
        <th>Issue Date</th>
        <th>Risk Rating</th>
        <th>Departement Responsible</th>
        <th>Approved Deadline</th>
      </tr>
      <tr v-for="(item, index) in filteredIssues" :key="index">
            <td>{{ item.reportTitle }}</td>
            <td>{{ item.issueTitle }}</td>
            <td>{{ item.issueDate }}</td>
            <td>{{ item.riskRating }}</td>
            <td>{{ item.departmentResponsible }}</td>
            <td>{{ item.approvedDeadline }}</td>
          </tr>
  </table>
  </div>
  <br><br>
  <div>
      <h2>Closed Issues</h2>
      <table class="issuelisttable">
      <tr>
        <th>Report Title</th>
        <th>Issue Title</th>
        <th>Issue Date</th>
        <th>Risk Rating</th>
        <th>Departement Responsible</th>
        <th>Approved Deadline</th>
      </tr>
      <tr v-for="(item, index) in filteredIssues2" :key="index">
            <td>{{ item.reportTitle }}{{ item.auditee.employee.department }}</td>
            <td>{{ item.issueTitle }}</td>
            <td>{{ item.issueDate }}</td>
            <td>{{ item.riskRating }}</td>
            <td>{{ item.departmentResponsible }}</td>
            <td>{{ item.approvedDeadline }}</td>
          </tr>
  </table>
  </div>

  </template>
  <script>

import EmployeeDataService from '../services/EmployeeDataService'
  import IssueService from '../services/IssueService'
  
  export default{
  
  name: 'dashboardAuditee',
  data()
  {
      return{
        
        eDepartment :"",
        selectedDepartment: "",
        selectedDepartment2: "",
        employee : [],
        issuesList:[],
        eid : "",
        date: '', // variable to hold the date value,

      }
  
  },
  
    methods :{
      retrieveEmployee(){
          this.eid = localStorage.getItem('eid');


              EmployeeDataService.getAuditee()
              .then(response=> {
                this.employee = response.data; //employee will save all the data 
                  console.log(this.employee);
                  this.employee.forEach(item => {     
                    if(item.employee.id === parseInt(this.eid))
                    {          
                     this.eDepartment = item.employee.department;
                    }
         
                  
             });



              })

              .catch(error=>{
                console.log(error);
              })
          },
  
          toIssue(event)
          {
            event.preventDefault();
            this.$router.push({name:"IssuePageAuditee"});

          },

           toDashboard(event)
          {
            event.preventDefault();
            localStorage.setItem('eid',this.eid);
            this.$router.push({name:"dashboardAuditee"});

          },

          toReport(event)
          {
            event.preventDefault();
          //  this.$router.push({name:"dashboardAuditor"});

          },

          toSettings(event)
          {
            event.preventDefault();
         //   this.$router.push({name:"dashboardAuditor"});

          },

          toLogout(event)
          {
            event.preventDefault();
            localStorage.removeItem('eid')  //remove the key from the local storage
            this.$router.push({name:"Login"});

          },






          retrieveIssue(){
          IssueService.getIssues()
              .then(response =>{
                  this.issuesList = response.data;
                  console.log(this.issuesList);                   
                  this.issuesList.forEach(issue => {
                  const date = new Date(issue.issueDate * 1000);
                  issue.issueDate = date.toLocaleDateString(); // update issueDate to the formatted date string
            });
  
            this.issuesList.forEach(issue => {
                  const date = new Date(issue.approvedDeadline * 1000);
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
  
      filteredIssues() { //Filter the issue list based on the departement and the status of the issue
          return this.issuesList.filter((issue) => issue.departmentResponsible === this.eDepartment && issue.status === 'Outstanding')
  },
  
  filteredIssues2() {
    return this.issuesList.filter((issue) => issue.departmentResponsible === this.eDepartment && issue.status === 'Closed')

  }
  
  
    },
  
    mounted()
    {
      this.retrieveEmployee();
      this.retrieveIssue();
  
  
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
  
  
      nav {
  background-color: #333;
}

.nav-links {
  display: flex;
  justify-content:left;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  color: #fff;
  display: block;
  padding: 10px;
  text-decoration: none;
}

.nav-links a:hover {
  background-color: #555;
}

header {
  background-color: #333;
  text-align: center;
  padding: 20px;
}

header h1 {
  color: #fff;
  font-size: 36px;
  margin: 0;
}
  </style>