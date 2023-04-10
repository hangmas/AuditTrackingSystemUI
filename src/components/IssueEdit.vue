<template>
    <div>
        <h3 id="editIssueHeader">Edit Issue</h3>
        <div class="editIssueBody">
            <div class="editissuedetails">
                <label class="label" for="auditreporttitle">Audit Report Title: </label>
                <br>
                <input class="inputtext" type="inputtext" name="auditreporttitletext" id="auditreporttitletextid" placeholder="" v-model="issueDetail.reportTitle">
                <br>        
                <label class="label" for="issuetitle">Audit Issue Title: </label>
                <br>
                <input class="inputtext" type="inputtext" name="auditissuetitletext" id="auditissuetitletextid" placeholder="" v-model="issueDetail.issueTitle">        
                <br>     
                <label class="label" for= "issueDate">Issue Date: </label>
                <br>
                <input class="inputtext" type="date" name="issuedate" id="issuedateid" placeholder="" v-model="issueDateNC">
                <br>           
                <label class="label" for= "approveddeadline">Approved Deadline: </label>
                <br>
                <input class="inputtext" type="date" name="approveddeadlineetext" id="approveddeadlineid" placeholder="" v-model="approvedDateNC">
                <br>       
                <label class="label" for= "risklevel">Risk Level: </label>
                <br>
                <select class="risklevel" name="risklevel" v-model="issueDetail.riskRating">
                    <option value="High" selected>High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                
                <!-- <input class="inputtext" type="inputtext" name="riskleveltext" id="risklevelid" placeholder="" v-model="issueDetail.riskRating"> -->
                <br>   
                    
            </div> 
            
            <div class="responsibledept">
                <label class="label" for="departmentresponsible">Department Responsible: </label>
                <br>
                <input class="inputtext" type="inputtext" name="deptresponsibletext" id="deptresponsibleid" placeholder="" v-model="issueDetail.departmentResponsible">
                <br>        
                <label class="label" for="personresponsible">Person Responsible: </label>
                <br>
                <input class="inputtext" type="inputtext" name="personresponsibletext" id="personresponsibleid" placeholder="" v-model="personresponsible" readonly>       
                <br>        
                <label class="label" for="emailresponsible">E-mail Address: </label>
                <br>
                <input class="inputtext" type="inputtext" name="emailtext" id="emailid" placeholder="" v-model="email">
                <br>
            </div>
            <br>
            <br>
            
    </div>
            <div class="issueupdate">
                <h3>Updates Of Issue</h3>
                <label class="label" for="actionsTaken">New Action Taken: </label>
                <br>
                <textarea class="textarea"  type="inputtext" name="deptresponsibletext" id="deptresponsibleid" placeholder="" rows="5" cols="50" v-model="newAction"></textarea>
                <br> 
                <br>       
                <label class="label" for="personresponsible">New Timeline: </label>
                <br>
                <input class="inputtext" type="date" name="newtimeline" id="newtimelineid" placeholder="" v-model="newTimeline" @change="updateTimestampNewTimeline">       
                <br>   
                <br>
                <label class="label" for="statusofissue">Status of Issue: </label>
                <br>
                <select class="issuestatus" name="issuestatus" v-model="issueStatus" @change="handlerStatus">
                    <option value="Outstanding" selected>Outstanding</option>
                    <option value="Closed">Closed</option>
                </select>
                <br>
                <br>
                <label v-if="showDateField" class="label" for="dateclosed">Date Issue Closed: </label>
                <br>
                <input v-if="showDateField" class="inputtext" type="date" name="dateclosed" id="dateclosedid" placeholder="" v-model="dateClosed" @change="updateTimestampDateClosed">       
                <br>
                <br>
                <br>
                <button id="updateissuebutton" @click="handleSaveUpdateIssueButton">SAVE CHANGES</button>
                <button id="cancelupdateissuebutton" @click="handlerCancelUpdateIssueButton">BACK TO ISSUE LIST</button>

            </div>
    </div>

</template>

<script>
import IssueService from '@/services/IssueService';
    export default{
        name: "IssueEdit",
        data(){
          return{
            issueDetail:{},
            issueDetailChanges:{},
            issueDateNC:"",
            approvedDateNC:"",
            personresponsible:"",
            email:"",
            newAction:"",
            newTimeline:"",
            newTimelineConverted:0,
            issueStatus:"Outstanding",
            issueStatusSelection:"",
            dateOfEdit:"",
            dateClosed:"",
            dateClosedConverted:0,
            showDateField:false,
            todayDateConverted:0,
            numberOfDaysOverdue:0,
            actionDetail:{}
          }
            
        },
        methods:{
            //this method gets the selected item from the locatStorage
            getIssueDetail(){
            const issueDetailPassed = localStorage.getItem('selectedIssuePassed');
            console.log(issueDetailPassed);
            if(issueDetailPassed){
                this.issueDetail = JSON.parse(issueDetailPassed);       
            }
            },

            handlerStatus(event){
                event.preventDefault();
                this.issueStatusSelection = this.issueStatus;
                if(this.issueStatusSelection=="Closed"){
                    this.showDateField=true;
                }else{
                    this.showDateField=false;
                }

                console.log(this.issueStatusSelection);
            },

            //converts the long format date to a Date format
            updateTimestamp1() {
                const timestamp = this.issueDetail.issueDate;
                const date = new Date(timestamp * 1000);
                const formattedDate = date.toLocaleDateString('en-CA');     
                this.issueDateNC = formattedDate;
            },

             //converts the long format date to a Date format
            updateTimestamp2() {
                const timestamp = this.issueDetail.approvedDeadline;
                const date = new Date(timestamp * 1000);
                const formattedDate = date.toLocaleDateString('en-CA');     
                this.approvedDateNC = formattedDate;
            },

            //this method stores the email and the person responsible
            getEmailAndPerson(){
                this.email = this.issueDetail.auditee.employee.email;
                this.personresponsible=this.issueDetail.auditee.employee.firstName+" "+this.issueDetail.auditee.employee.lastName;
            },

            handlerRisk(event){
                event.preventDefault();
                this.issueStatusSelection = this.issueStatus;
                if(this.issueStatusSelection=="closed"){
                    this.showDateField=true;
                }else{
                    this.showDateField=false;
                }

                console.log(this.issueStatusSelection);
            },
            
            //method to handle the event where based on the value of the selection, the visibility of some fields are determined
            
            //method to convert the date format to long to fit into the database
            updateTimestampDateClosed() {
            const timestamp = new Date(this.dateClosed).getTime() / 1000;
            this.dateClosedConverted = timestamp;
            console.log(this.dateClosedConverted);
            },

            //method to convert the date format to long to fit into the database
            updateTimestampNewTimeline() {
            const timestamp = new Date(this.newTimeline).getTime() / 1000;
            this.newTimelineConverted = timestamp;
            console.log(this.newTimelineConverted);
            },

            //to handle the cancel button merely to return to the issue list page
            handlerCancelUpdateIssueButton(){
                this.$router.push({name:"IssuesPage"});
                this.issueDetail={};
            },

            //method to handle the save button
            handleSaveUpdateIssueButton(){
                
                //this gets the date format converted to long format to be posted to the database
                const todayDate = new Date();
                const timestamp = Math.floor(todayDate.getTime() / 1000);
                this.todayDateConverted = timestamp;

                //this computes the number of days overdue from the approved timeline to the current date
                let noOfDaysDueComputed = Math.floor((this.todayDateConverted - this.issueDetail.approvedDeadline)/86400);
                if(noOfDaysDueComputed<=0){
                    this.numberOfDaysOverdue = 0;
                }else{
                    this.numberOfDaysOverdue = noOfDaysDueComputed;
                }

                const timestampApprovedDeadline = Date.parse(new Date(this.approvedDateNC).toISOString()) / 1000;
                this.issueDetail.approvedDeadline = timestampApprovedDeadline;
                
                // const timestampApprovedDeadLine = new Date(this.approvedDateNC).getTime() / 1000;
                // this.issueDetail.approvedDeadline = timestampApprovedDeadLine;

                //compiles all variables to an object that is acceptable by the api for posting
                this.issueDetailChanges={
                    id:this.issueDetail.id,
                    reportTitle:this.issueDetail.reportTitle,
                    issueDate:this.issueDetail.issueDate,
                    riskRating:this.issueDetail.riskRating,
                    departmentResponsible:this.issueDetail.departmentResponsible,
                    approvedDeadline:this.issueDetail.approvedDeadline,
                    empEmail:this.email
                }

                //calls the service to update issues and actions
                IssueService.updateIssuesAndActions(this.issueDetailChanges)
                    .then(response =>{
                        console.log(response.data);
                    })
                    .catch(error =>{
                        console.log(error);
                    })

                //this sets a condition the if new action is indicated in the text field, the creation of an object for posting will be performed
                if(!this.newAction==""){
                    this.actionDetail={
                        actionTaken:this.newAction,
                        todayDate:this.todayDateConverted,
                        status:this.issueStatus,
                        closingDate:this.dateClosedConverted,
                        noOfDaysDue:this.numberOfDaysOverdue,
                        newlyApprovedDate:this.newTimelineConverted
                    
                    }
                    //service to create issue action.  using the above values, these are used to be posted into the repository
                     IssueService.createIssueAction(this.issueDetail.id,this.actionDetail)
                        .then(response =>{
                            console.log(response.data);
                        })

                        .catch(error =>{
                            console.log(error);
                        })
                }
                window.alert("You have successfully saved the issue record!");
            }

        },
        
        mounted(){
            this.getIssueDetail();
            this. updateTimestamp1();
            this.updateTimestamp2();
            this.getEmailAndPerson();
        }
       
    }
    

</script>

<style scoped>
div .editIssueBody {
    display: flex;
    flex-direction:row;
    align-items: flex-start;
}

div .responsibledept{
    margin-left: 30px;
}

div .inputtext{
    width: 300px;
    margin-top: 5px;
}

#cancelcreate{
    margin-left: 20px;
}

#cancelupdateissuebutton{
    margin-left: 20px;
}
</style>