<template>
<div>
  <h1>Auditor Dashboard</h1>
    <h2>Outstanding Issues</h2>
    <div>
      <p><b><u>Total Outstanding Issue : {{ tRisk }}</u></b></p>
    <p>Low Risk : <span style="color: green"><b>{{ lRisk }} ({{   (lRisk/tRisk * 100).toFixed(2)}}%)</b></span>
    <br>Medium Risk : <span style="color: orange"><b>{{ mRisk }} ({{    (mRisk/tRisk * 100).toFixed(2) }}%)</b></span>
    <br>High Risk : <span style="color: red"><b>{{ hRisk }} ({{   (hRisk/tRisk * 100).toFixed(2)}}%)</b></span>
  </p>
   </div>
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
    <div>
      <p><b>Total Outstanding Issue : {{ tRisk2 }}</b></p>
    <p>Low Risk : <span style="color: green"><b>{{ lRisk2 }} ({{    (this.lRisk2/this.tRisk2) * 100 }}%)</b></span>
    <br>Medium Risk : <span style="color: orange"><b>{{ mRisk2 }} ({{    (this.mRisk2/this.tRisk2) * 100 }}%)</b></span>
    <br>High Risk : <span style="color: red"><b>{{ hRisk2 }} ({{    (this.hRisk2/this.tRisk2) * 100 }}%)</b></span>
  </p>
   </div>
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
      date: '', // variable to hold the date value

    
    }

},

  methods :{
    retrieveEmployee(){

           EmployeeDataService.get()
            .then(response =>{
                this.employee = response.data; //employee will save all the data 
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

          // this.issuesList.forEach(issue => {
          //   if(issue.riskRating === 'Low' && issue.status ==='Outstanding') this.lRisk ++;
          //   if(issue.riskRating === 'Medium' && issue.status ==='Outstanding') this.mRisk ++;
          //   if(issue.riskRating === 'High' && issue.status ==='Outstanding') this.hRisk ++;
          //   if(issue.status === 'Outstanding') this.tRisk++;
          // });

          
          // this.issuesList.forEach(issue => {
          //   if(issue.riskRating === 'Low' && issue.status ==='Closed') this.lRisk2 ++;
          //   if(issue.riskRating === 'Medium' && issue.status ==='Closed') this.mRisk2 ++;
          //   if(issue.riskRating === 'High' && issue.status ==='Closed') this.hRisk2 ++;
          //   if(issue.status === 'Closed') this.tRisk2++;
          // });
        
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
    },
  
  tRisk() {
    return this.filteredIssues.filter(issue => issue.riskRating === 'Low' || issue.riskRating === 'High' || issue.riskRating === 'Medium').length;
  },
  lRisk() {
    return this.filteredIssues.filter(issue => issue.riskRating === 'Low').length;
  },
  mRisk() {
    return this.filteredIssues.filter(issue => issue.riskRating === 'Medium').length;
  },
  hRisk() {
    return this.filteredIssues.filter(issue => issue.riskRating === 'High').length;
  },

  tRisk2() {
    return this.filteredIssues2.filter(issue => issue.riskRating === 'Low' || issue.riskRating === 'High' || issue.riskRating === 'Medium').length;
  },
  lRisk2() {
    return this.filteredIssues2.filter(issue => issue.riskRating === 'Low').length;
  },
  mRisk2() {
    return this.filteredIssues2.filter(issue => issue.riskRating === 'Medium').length;
  },
  hRisk2() {
    return this.filteredIssues2.filter(issue => issue.riskRating === 'High').length;
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