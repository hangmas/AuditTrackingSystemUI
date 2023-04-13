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
            <th>Status</th>
        
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
            <td>{{ new Date(item.approvedDeadline * 1000).toLocaleDateString('en-US', { timeZone: 'America/New_York' }) }}</td>
            <td>{{ item.status }}</td>
            
        </tr>
    </table>

</template>

<script>
import EmployeeDataService from '@/services/EmployeeDataService';
import IssueService from '@/services/IssueService';


export default{
    name: "IssueList",
    props:{
        //this props set up at the parent component(Issue Page) allows the function to be used in this component
        //this gets the object representing selected issue from the list of issues so that this can be used at the parent component
        getSelectedIssue: Function,
        //the string property receives the values from the select element at the parent component.  any change to this will do filtering to the list of issues
        selectedFiltering: String
        
    },
    data(){
        return {         
       
        issuesList:[],
        issuesListAuditee:[],
        issuesListToDisplay:[],
        employeeList:[],
        employeeListUnpacked:[],
        issueListUnpacked:[],
        employeeName:"",
        checkedIndex:null,
        selectedIssue:{},
        employeeTag:0,  //0= Auditee; 1=Auditor; 2=Admin
        employeeId:0,
        empDepartment:"",
        filteredEmp:[],
        filteredEmpDep:""
                 
    }
},


methods: {
    //retrieve all issues from the database
    retrieveIssue(){
        IssueService.getIssues()
            .then(response =>{
            
                this.issuesList = response.data;
                //this approach of storing all issues into the local repository is done to address the error on delayed actions from vue and the repository
                //resulting to some of the values not obtained for use by other functions resulting to empty variables hence causing errors
                localStorage.setItem("issuesList",JSON.stringify(this.issuesList));  
            })
            .catch(error => {
                console.log(error);
            })
    },

    
    //retrieve all employees
    retrieveEmployee(){
        EmployeeDataService.get()
            .then(response =>{
               // this.employeeId =2;
                this.employeeList = response.data;
                //this approach is similar to above to address the delay of response from the repository
                localStorage.setItem("listEmployeePassed",JSON.stringify(this.employeeList));                                                       
            })
            .catch(error =>{
                console.log(error);
            })

    },

    retrieveEmployeeAuditor(){
        EmployeeDataService.getAuditee()
            .then(response =>{
               // this.employeeId =2;
                this.employeeList = response.data;
                console.log(this.employeeList);
                //this approach is similar to above to address the delay of response from the repository
                localStorage.setItem("listEmployeePassed",JSON.stringify(this.employeeList));                                                       
            })
            .catch(error =>{
                console.log(error);
            })
    },

    //the store list of employees in the local repository is unpacked and stored in a local variable to be used.
    unpackEmployee(){
       
            const employeeListObtained = localStorage.getItem('listEmployeePassed');
         //   this.employeeId= 2;
            if(employeeListObtained){
                this.employeeListUnpacked = JSON.parse(employeeListObtained);
                
                console.log(this.employeeListUnpacked);       
            }      

    },

    //after the local storage is unpacked, the values are used for subsequent actions. for loop method is used for this approach
    //some flexibilty on use of functions as some don't work or unfamiliar
    filterEmployee(){
        this.employeeId= localStorage.getItem('eid');       
        let filteredEmp=[];
        let filteredEmployeeDepartment="";
        
        for(let i = 0; i<this.employeeListUnpacked.length;i++){
            if(this.employeeListUnpacked[i].employee.id==this.employeeId){
                filteredEmp = this.employeeListUnpacked[i];
                filteredEmployeeDepartment = filteredEmp.employee.department;
            }
        } 
        
        this.filteredEmpDep = filteredEmployeeDepartment;
        console.log(this.filteredEmpDep);
               
    },

    //this is to unpack the local storage for subsequent use
    unpackIssue(){      
        const issueListObtained = localStorage.getItem('issuesList');
            if(issueListObtained){
                this.issueListUnpacked = JSON.parse(issueListObtained);
              
            }   

            console.log(this.issueListUnpacked);
        
    },

    //method adopted to to filter the issue for the desired display
    filterIssueForAuditee(){
        let unpackedIssueLocal = this.issueListUnpacked;
        let issueListAuditeeLocal = [];
        for(let i = 0; i<unpackedIssueLocal.length;i++){
                 if(unpackedIssueLocal[i].departmentResponsible==this.filteredEmpDep){             
                    issueListAuditeeLocal.push(unpackedIssueLocal[i]);            
            }
        } 

        this.issuesListAuditee = issueListAuditeeLocal;

    },

    getEmployeeTag(){
        const employeeTagObtained = localStorage.getItem('role');
        
        this.employeeTag = employeeTagObtained;
    },

    //display functions to support the filter button.  any values from the selection at the issues list page will perfom filtering
    displayIssues(){
                
            if(this.employeeTag == 0){
                this.issuesListToDisplay = this.issuesListAuditee;
                if(this.selectedFiltering=="outstanding"){
                    this.issuesListToDisplay = this.issuesListAuditee.filter(issue => issue.status ==="Outstanding");
                } else if(this.selectedFiltering=="closed"){
                    this.issuesListToDisplay = this.issuesListAuditee.filter(issue => issue.status ==="Closed");
                } else if(this.selectedFiltering=="highrisk"){
                    this.issuesListToDisplay = this.issuesListAuditee.filter(issue => issue.riskRating ==="High");
                } else if(this.selectedFiltering=="mediumrisk"){
                    this.issuesListToDisplay = this.issuesListAuditee.filter(issue => issue.riskRating ==="Medium");
                }else if(this.selectedFiltering=="lowrisk"){
                    this.issuesListToDisplay = this.issuesListAuditee.filter(issue => issue.riskRating ==="Low");
                }else{
                    this.issuesListToDisplay= this.issuesListAuditee;
                }

            }else if(this.employeeTag == 1||this.employeeTag == 2){
                this.issuesListToDisplay= this.issueListUnpacked;
                if(this.selectedFiltering=="outstanding"){
                    this.issuesListToDisplay = this.issueListUnpacked.filter(issue => issue.status ==="Outstanding");
                } else if(this.selectedFiltering=="closed"){
                    this.issuesListToDisplay = this.issueListUnpacked.filter(issue => issue.status ==="Closed");
                } else if(this.selectedFiltering=="highrisk"){
                    this.issuesListToDisplay = this.issueListUnpacked.filter(issue => issue.riskRating ==="High");
                } else if(this.selectedFiltering=="mediumrisk"){
                    this.issuesListToDisplay = this.issueListUnpacked.filter(issue => issue.riskRating ==="Medium");
                }else if(this.selectedFiltering=="lowrisk"){
                    this.issuesListToDisplay = this.issueListUnpacked.filter(issue => issue.riskRating ==="Low");
                }else{
                    this.issuesListToDisplay= this.issueListUnpacked;
                }

                }
      },

    //set the value of index when the row is checked.
    updateCheckbox(index) {
        this.checkedIndex = index;
        this.selectedIssue = this.issuesList[index];     
        
    },

},

watch:{
    //watch object to watch any update to the String selectedFiltering
    selectedFiltering(){
        this.displayIssues();
    }
},

mounted(){
    //these methods run when the page loads
    this.getEmployeeTag();
    this.retrieveIssue();
    this.retrieveEmployeeAuditor();
   // this.retrieveEmployee();
    this.unpackEmployee();
    this.filterEmployee();
    this.unpackIssue();
    this. filterIssueForAuditee();
    this.displayIssues();
}
}
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
        
    } */

</style>