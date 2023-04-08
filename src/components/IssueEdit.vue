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
                <input class="inputtext" type="inputtext" name="riskleveltext" id="risklevelid" placeholder="" v-model="issueDetail.riskRating">
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
                <input class="inputtext" type="date" name="newtimeline" id="newtimelineid" placeholder="" v-model="newTimeline">       
                <br>   
                <br>
                <label class="label" for="personresponsible">Status of Issue: </label>
                <br>
                <select class="issuestatus" name="issuestatus" v-model="issueStatus" @change="handlerStatus">
                    <option value="outstanding">Outstanding</option>
                    <option value="closed">Closed</option>
                </select>
            </div>
    </div>

</template>

<script>


    export default{
        name: "IssueEdit",
        data(){
          return{
            issueDetail:{},
            issueDateNC:"",
            approvedDateNC:"",
            personresponsible:"",
            email:"",
            newAction:"",
            newTimeline:"",
            issueStatus:"",
            issueStatusSelection:"",
            dateOfEdit:""
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
            updateTimestamp1() {
                const timestamp = this.issueDetail.issueDate;
                const date = new Date(timestamp * 1000);
                const formattedDate = date.toLocaleDateString('en-CA');     
                this.issueDateNC = formattedDate;
            },

            updateTimestamp2() {
                const timestamp = this.issueDetail.approvedDeadline;
                const date = new Date(timestamp * 1000);
                const formattedDate = date.toLocaleDateString('en-CA');     
                this.approvedDateNC = formattedDate;
            },

            getEmail(){
                this.email = this.issueDetail.auditee.employee.email;
                this.personresponsible=this.issueDetail.auditee.employee.firstName+" "+this.issueDetail.auditee.employee.lastName;
            },
            handlerStatus(event){
                event.preventDefault();
                this.issueStatusSelection = this.issueStatus;
                console.log(this.issueStatusSelection);
            }
        },
        
        mounted(){
            this.getIssueDetail();
            this. updateTimestamp1();
            this.updateTimestamp2();
            this.getEmail();
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
</style>