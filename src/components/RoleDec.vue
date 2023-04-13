<template>
    <table>
      <tr>
        <th>Employee ID</th>
        <th>Email Address</th>
        <th>Role</th>
      </tr>
      <tr v-for="employee in employees" :key="employee.id">
        <td>{{employee.id}}</td>
        <td>{{employee.email}}</td>
        <select class="filtering" name="fbutton" v-model="filterStatus" @change="doShow(employee.email, $event.target.value)">
          <option value="filterlabel" selected>Filter</option>
          <option value="2">Admin</option>
          <option value="1">Auditor</option>
          <option value="0">Auditee</option>
        </select>
      </tr>
    </table>
    <button @click="submit">Apply changes</button>
  </template>
  <script>
  import EmployeeDataService from "../services/EmployeeDataService";
  
  export default {
    name: "roleDec",
    data() {
      return {
        employees: [],
        newData: {}
      }
    },
  
    
    methods: {
      getAllEmployees() {
        EmployeeDataService.getAllEmployees().then(response => { this.employees = response.data })
      },
      doShow(email, role) {
        if (["0","1","2"].includes(role))
          this.newData[email] = parseInt(role);
      },
      submit(){
        EmployeeDataService.postEmployeeRole(this.newData);
      }
    },
    mounted() {
      console.log("error",this)
      this.getAllEmployees();
  
      this.employees = [];
    },
  
  }
  
  </script>

  <style></style>
