<template>
  <!-- <div>
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
  </div> -->
  <div>
    <!-- <h1>Auditor Dashboard</h1> -->
    <h2>Outstanding Issues</h2>
    <div>
      <p><b><u>Total Outstanding Issue : {{ tRisk }}</u></b></p>
      <!-- <Doughnut :data="outstandingData"  /> -->
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
  <h2>Closed Issues</h2>
  <div class="issues-chart">
    
    <div>
      <p><b><u>Total Closed Issue : {{ tRisk2 }}</u></b></p>
      <p class="chart-container">
        <Doughnut :data="outstandingData"  />
        <!-- Low Risk : <span style="color: green"><b>{{ lRisk2 }} ({{ (lRisk2 / tRisk2 * 100).toFixed(2) }}%)</b></span>
        <br>Medium Risk : <span style="color: orange"><b>{{ mRisk2 }} ({{ (mRisk2 / tRisk2 * 100).toFixed(2)
        }}%)</b></span>
        <br>High Risk : <span style="color: red"><b>{{ hRisk2 }} ({{ (hRisk2 / tRisk2 * 100).toFixed(2) }}%)</b></span> -->
      </p>
    </div>
    <div class="issues-table">
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
    
  </div>
</template>
<script>
import EmployeeDataService from '../services/EmployeeDataService'
import IssueService from '../services/IssueService'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'


ChartJS.register(ArcElement, Tooltip, Legend)
export default {

  name: 'dashboardAuditor',
  components: {
    Doughnut
  },
  data() {
    return {


      selectedDepartment: "",
      selectedDepartment2: "",
      employee: [],
      issuesList: [],
      date: '', // variable to hold the date value


    }
  },

  methods: {
    retrieveEmployee() {

      EmployeeDataService.get()
        .then(response => {
          this.employee = response.data; //employee will save all the data 
        })

        .catch(error => {
          console.log(error);
        })
    },

    toIssue(event) {
      event.preventDefault();
      this.$router.push({ name: "IssuesPage" });

    },

    toDashboard(event) {
      event.preventDefault();
      localStorage.setItem('eid', this.eid);
      this.$router.push({ name: "dashboardAuditor" });



    },

    toReport(event) {
      event.preventDefault();
      //  this.$router.push({name:"dashboardAuditor"});

    },

    toSettings(event) {
      event.preventDefault();
      //   this.$router.push({name:"dashboardAuditor"});

    },

    toLogout(event) {
      event.preventDefault();
      localStorage.removeItem('eid')  //remove the key from the local storage
      this.$router.push({ name: "Login" });

    },

    retrieveIssue() {
      IssueService.getIssues()
        .then(response => {
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

    filteredEmp() {

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
    },
    outstandingData() {
      let chartData = {
        labels: ['Low Risk', 'Medium Risk', 'High Risk'],
        datasets: [
          {
            backgroundColor: ['#FFB034', '#FF681C', '#CE2029'],
            data: [(this.lRisk2 / this.tRisk2 * 100).toFixed(2), (this.mRisk2 / this.tRisk2 * 100).toFixed(2), (this.hRisk2 / this.tRisk2 * 100).toFixed(2)]


          }
        ]

      }
      return chartData;
    },

  },



  mounted() {
    this.retrieveEmployee();
    this.retrieveIssue();

  }
};

</script>
  
<style scoped>
/* table.issuelisttable {
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
} */
</style>