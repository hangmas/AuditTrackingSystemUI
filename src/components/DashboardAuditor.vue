<template>
<div>
  <h1>Auditor Dashboard</h1>
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
    <label for="department-filter2">Filter by department: </label>
    <select id="department-filter2" v-model="selectedDepartment2">
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
    </tr>
    <tr v-for="(item, index) in filteredIssues2" :key="index">
          <td>{{ item.reportTitle }}</td>
          <td>{{ item.issueTitle }}</td>
          <td>{{ item.issueDate }}</td>
          <td>{{ item.riskRating }}</td>
          <td>{{ item.departmentResponsible }}</td>
          <td>{{ item.approvedDeadline }}</td>
        </tr>
</table>
</div>


<!--
<div>
  <p v-for="(item, index) in filteredEmp" :key="index" :value="firstName">{{ item.firstName }}</p>
</div>-->
<!--
<div>
  <ul>
    <li v-for="(employee, index) in employee" :key="index">{{ employee.firstName }}</li>
    </ul>
  </div>-->
</template>
<script>
import EmployeeDataService from '../services/EmployeeDataService'
import IssueService from '../services/IssueService'

export default{

name: 'dashboardAuditor',
data()
{
    return{
      

      selectedDepartment: "",
      selectedDepartment2: "",
      employee : [],
      issuesList:[],
      firstName : "",
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
  if (this.selectedDepartment2) {
    return this.issuesList.filter((issue) => {
      return issue.departmentResponsible === this.selectedDepartment2 && issue.status === 'Closed';
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