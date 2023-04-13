<template>
    <div class="issue-details-container">
        <div class="header">
            <h3>Audit Issue Details</h3>
        </div>
        <div class="auditdetails">
            <label><strong>Audit Report Title: </strong> </label>
            <span>{{ issueDetailView.reportTitle  }}</span>
            <br>
            <label><strong>Issue Title: </strong> </label>
            <span>{{ issueDetailView.issueTitle }}</span>
            <br>
            <label><strong>Risk Rating: </strong> </label>
            <span>{{ issueDetailView.riskRating }}</span>
            <br>
            <label><strong>Name of Person Responsible: </strong> </label>
            <span>{{ personResponsible }}</span>
            <br>
            <label><strong>Email Address of Person Responsible: </strong> </label>
            <span>{{ email }}</span>
            <br>
            <label><strong>Department Responsible: </strong> </label>
            <span>{{ issueDetailView.departmentResponsible }}</span>
            <br>
            <label><strong>Issue Date: </strong> </label>
            <span>{{ new Date(issueDetailView.issueDate * 1000).toLocaleDateString() }}</span>
            <br>
            <label><strong>Approved Committed Timeline: </strong> </label>
            <span>{{ new Date(issueDetailView.approvedDeadline * 1000).toLocaleDateString() }}</span>
            <br>
        </div>

        <br>
        <br>
        <div>
            <table class="issueactiontable">
                <caption style="text-align: center; font-weight: bold;">List of Actions Taken</caption>
            <tr>                
                <th>Date</th>
                <th>Actions Taken</th>
                <th>No of Due Days</th>
                <th>New Approved Timeline</th>
            </tr>
            
            <tr v-for="(item, index) in actionsList" :key="index">           
                <!-- The :checked attribute is used to bind the checkbox's checked state to the checkedIndex === index expression. 
                The checkedIndex variable is a computed property,  and it's compared with index to determine if the checkbox should be checked or not. -->
                <td>{{ new Date(item.todayDate * 1000).toLocaleDateString() }}</td>
                <td>{{ item.actionTaken }}</td>
                <td>{{ item.noOfDaysDue  }}</td>
                <td>{{ item.newlyApprovedDate === 0 ? '' : new Date(item.newlyApprovedDate * 1000).toLocaleDateString() }}</td>
                        
        </tr>
        </table>
        <br>
        <br>
        <!-- <button id="backtolistbutton" @click="handlerBackToListButton">BACK TO LIST OF ISSUES</button> -->
        </div>
        
    </div>

</template>
<script>
import IssueService from '@/services/IssueService';

export default{
    name: "IssueViewDetail",
    data(){
        return{
            issueDetailView:{},
            actionsList:{},
            email:"",
            personResponsible:"",
            employeeTag:0,  //0= Auditee; 1=Auditor; 2=Admin
        }
        
    },
    methods:{

            //method to get the issue details.  it includes getting from the local storage the value of the particular issue to be edited
            getIssueDetail(){
            const issueDetailPassed = localStorage.getItem('selectedIssuePassed');
            console.log(issueDetailPassed);
            if(issueDetailPassed){
                this.issueDetailView = JSON.parse(issueDetailPassed);
                console.log(this.issueDetailView);       
            }
            },

            //method to get the email and name of the person for display
            getEmailAndPerson() {
                if (this.issueDetailView && this.issueDetailView.auditee && this.issueDetailView.auditee.employee) {
                    this.email = this.issueDetailView.auditee.employee.email;
                    this.personResponsible = `${this.issueDetailView.auditee.employee.firstName} ${this.issueDetailView.auditee.employee.lastName}`;                             

                } else {
                    this.email= '';
                    this.personResponsible= '' ;
                }
            },

            //method to retrieve the history of actions taken to a particular issue
            //it uses the service setup in IssueService file
            retrieveActions(){
            IssueService.getIssueActions(this.issueDetailView.id)
                .then(response =>{
                    this.actionsList = response.data;
                    console.log(this.actionsList);  

                })
                .catch(error => {
                    console.log(error);
                })
            },

            //handle the back button in the view detail page
            // handlerBackToListButton(event){
            //     event.preventDefault();
            //     if(this.employeeTag== 1){
            //         this.$router.push({name:"IssuesPage"});
            //     } else if (this.employeeTag== 0){
            //         this.$router.push({name:"IssuePageAuditee"});
            //     }
                
            // },

            // employeeTagSet(){
            //    // const employeeTagLocal = 
            //     this.employeeTag = 0;

            // },
            getEmployeeTag(){
                const employeeTagObtained = localStorage.getItem('role');          
                this.employeeTag = employeeTagObtained;
            },


},

    mounted(){
        this.getEmployeeTag();
        this.getIssueDetail();
        this.getEmailAndPerson();
        this.retrieveActions();
        //this.employeeTagSet();
        
    },
    
}

</script>
<style scoped>


</style>