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
        <tr v-for="(item, index) in issuesListToDisplay" :key="index">
           
            <!-- The :checked attribute is used to bind the checkbox's checked state to the checkedIndex === index expression. 
            The checkedIndex variable is a computed property,  and it's compared with index to determine if the checkbox should be checked or not. -->
            <td><input type="checkbox" name="issueCheckbox + index" :checked="checkedIndex === index" @change="updateCheckbox(index),getSelectedIssue(selectedIssue)"></td>
            <td>{{ item.reportTitle }}</td>
            <td>{{ item.issueTitle }}</td>
            <td>{{ new Date(item.issueDate * 1000).toLocaleDateString() }}</td>
            <td>{{ item.riskRating  }}</td>
            <td>{{ item.auditee.employee.firstName }} {{ item.auditee.employee.lastName }}</td>
            <td>{{ item.departmentResponsible }}</td>
            <td>{{ new Date(item.approvedDeadline * 1000).toLocaleDateString() }}</td>
            
        </tr>
    </table>

</template>

<script>
import EmployeeDataService from '@/services/EmployeeDataService';
import IssueService from '@/services/IssueService';


export default{
    name: "IssueList",
    props:{
        getSelectedIssue: Function
    },
    data(){
        return {         
       
        issuesList:[],
        issuesListToDisplay:[],
        employeeList:[],
        employeeName:"",
        checkedIndex:null,
        selectedIssue:{},
        employeeTag:0,  //0= Auditee; 1=Auditor; 2=Admin
        employeeId:0,
        empDepartment:"",
        filteredEmp:[]
           
    }
},


methods: {
    //retrieve all issues from the database
    retrieveIssue(){
        IssueService.getIssues()
            .then(response =>{
                
                //this.employeeId = localStorage.getItem('eid');   //for now employee ID is fixed.
                //get the employee tag
                this.employeeId=1;
                this.issuesList = response.data;

                if(this.employeeTag==1){
                    this.issuesListToDisplay=this.issuesList;
                }else{
                    EmployeeDataService.get()
                        .then(response =>{
                            
                            this.employeeList = response.data;
                            this.filteredEmp=this.employeeList.filter(employee => employee.id==this.employeeId);
                            this.empDepartment= this.filteredEmp[0].department;  
                            console.log(this.empDepartment);
                            this.issuesListToDisplay=this.issuesList.filter((issue) => issue.departmentResponsible === this.empDepartment);
                                                                         
                        })
                        .catch(error =>{
                            console.log(error);
                        })

                }
                    

            })
            .catch(error => {
                console.log(error);
            })
    },

    //retrieve all employees
    retrieveEmployee(){
        EmployeeDataService.get()
            .then(response =>{
                this.employeeId =1;
                this.employeeList = response.data;
                this.filteredEmp=this.employeeList.filter(employee => employee.id==this.employeeId);
                this.empDepartment= this.filteredEmp[0].department;                  
                                         
            })
            .catch(error =>{
                console.log(error);
            })

    },
    //set the value of index when the row is checked.
    updateCheckbox(index) {
        this.checkedIndex = index;
        this.selectedIssue = this.issuesList[index];
        //console.log(this.selectedIssue);
        
    },

    
  
},

mounted(){

//this.retrieveEmployee();
//this.filteredIssues();
this.retrieveIssue();



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