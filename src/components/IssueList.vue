<template>
    <div id="issueListHeader">
        <h3>Issue List</h3>
        <p>List of Outstanding Audit Issues</p>
    </div>
    <table class="issuelisttable">
        <tr>
            <th></th>
            <th>Report Title</th>
            <th>Issue Title</th>
            <th>Issue Date</th>
            <th>Risk Rating</th>
            <th>Person Responsible</th>
            <th>Department Responsible</th>
            <th>Approved DeadLine</th>
        
        <!-- This following code creates a table row for each item in the issuesList array using the v-for directive. 
        The :key binding is used to provide a unique identifier for each row.
        Inside each row, there is a checkbox input with the name attribute set to "issueCheckbox + index". 
        The :checked binding is used to set the initial checked state of the checkbox based on whether the checkedIndex variable is equal to the current index in the loop. The @change event listener is bound to the updateCheckbox(index) method, which is called whenever the checkbox is changed. The index parameter is passed to the method to identify which checkbox was changed.

        The remaining <td> elements contain data from the item object for each row. 
        The {{ }} syntax is used to interpolate the values of each property into the table cell. -->
        
        </tr>
        <tr v-for="(item, index) in issuesList" :key="index">
            <td><input type="checkbox" name="issueCheckbox + index" :checked="checkedIndex === index" @change="updateCheckbox(index)"></td>
            <td>{{ item.reportTitle }}</td>
            <td>{{ item.issueTitle }}</td>
            <td>{{ item.issueDate }}</td>
            <td>{{ item.riskRating  }}</td>
            <td>{{ item.auditee.employee.firstName }} {{ item.auditee.employee.lastName }}</td>
            <td>{{ item.departmentResponsible }}</td>
            <td>{{ item.approvedDeadline }}</td>
            
        </tr>
    </table>

</template>

<script>
import EmployeeDataService from '@/services/EmployeeDataService';
import IssueService from '@/services/IssueService';


export default{
    name: "IssueList",
    data(){
        return {         
       
        issuesList:[],
        employeeList:[],
        employeeName:"",
        checkedIndex:null,
        selectedIssue:{}
        }
},

methods: {
    //retrieve all issues from the database
    retrieveIssue(){
        IssueService.getIssues()
            .then(response =>{
                this.issuesList = response.data;
                console.log(this.issuesList);

            })
            .catch(error => {
                console.log(error);
            })
    },

    //retrieve all employees
    retrieveEmployee(){
        EmployeeDataService.get()
            .then(response =>{
                this.employeeList = response.data;
                
            })
            .catch(error =>{
                console.log(error);
            })

    },
    //set the value of index when the row is checked.
    updateCheckbox(index) {
        this.checkedIndex = index;
        this.selectedIssue = this.issuesList[index];
    }
  

},

mounted(){
this.retrieveIssue();
this.retrieveEmployee();


}
}


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