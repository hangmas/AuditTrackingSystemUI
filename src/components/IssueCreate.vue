<template>
    <div>
        <h3 id="createIssueHeader">Create New Issue</h3>
        <div class="createIssueBody">
            <div class="issuedetails">
                <label class="label" for="auditreporttitle">Audit Report Title: </label>
                <br>
                <input class="inputtext" type="inputtext" name="auditreporttitletext" id="auditreporttitletextid" placeholder="" v-model="issueData.reportTitle">
                <br>        
                <label class="label" for="issuetitle">Audit Issue Title: </label>
                <br>
                <input class="inputtext" type="inputtext" name="auditissuetitletext" id="auditissuetitletextid" placeholder="" v-model="issueData.issueTitle">        
                <br>     
                <label class="label" for= "issueDate">Issue Date: </label>
                <br>
                <input class="inputtext" type="date" name="issuedate" id="issuedateid" placeholder="" v-model="issueDateNC" @change="updateTimestamp1">
                <br>           
                <label class="label" for= "approveddeadline">Approved Deadline: </label>
                <br>
                <input class="inputtext" type="date" name="approveddeadlineetext" id="approveddeadlineid" placeholder="" v-model="approvedDateNC" @change="updateTimestamp2">
                <br>       
                <label class="label" for= "risklevel">Risk Level: </label>
                <br>
                <input class="inputtext" type="inputtext" name="riskleveltext" id="risklevelid" placeholder="" v-model="issueData.riskRating">
                <br>       
            </div> 
            
            <div class="responsibledept">
                <label class="label" for="departmentresponsible">Department Responsible: </label>
                <br>
                <input class="inputtext" type="inputtext" name="deptresponsibletext" id="deptresponsibleid" placeholder="" v-model="issueData.departmentResponsible">
                <br>        
                <label class="label" for="personresponsible">Person Responsible: </label>
                <br>
                <input class="inputtext" type="inputtext" name="personresponsibletext" id="personresponsibleid" placeholder="" v-model="personresponsible">       
                <br>        
                <label class="label" for="emailresponsible">E-mail Address: </label>
                <br>
                <input class="inputtext" type="inputtext" name="emailtext" id="emailid" placeholder="" v-model="issueData.empEmail">
                <br>
            </div>
            
        </div>
        <br>
        <button id="createnewissue" @click="createNewIssue">Create New Issue</button>
        <button id="cancelcreate" @click="cancelButton">Cancel</button>
        <!-- <IssueList /> -->

    </div>

</template>
<script>
import IssueService from "@/services/IssueService";
// import IssueList from "./IssueList.vue"
export default{
    name: "IssueCreate",
    data(){
        return{
        issueData:{
        reportTitle:"",
        issueTitle: "",
        issueDate:0,
        riskRating: "",
        departmentResponsible:"",
        approvedDeadline:0,
        empEmail:""
        },
        personresponsible:"",
        issueDateNC:"",
        approvedDateNC:""
              
        }
        
    },
    methods: {

        createNewIssue(){
            IssueService.createIssue(this.issueData)
                .then(response =>{
                    console.log(response.data);
                    this.issueData={};
                })
                .catch(error =>{
                    console.log(error.response.data);
                })
        
        },

        updateTimestamp1() {
            const timestamp = new Date(this.issueDateNC).getTime() / 1000;
            this.issueData.issueDate = timestamp;
            },

        updateTimestamp2() {
            const timestamp = new Date(this.issueDateNC).getTime() / 1000;
            this.issueData.approvedDeadline = timestamp;
            },


        cancelButton(event){
            event.preventDefault();
            this.$router.push({name:"IssuesPage"});

        }

    },

    // components: {
    //     IssueList
    // }
        
    

}
</script>
<style scoped>
div .createIssueBody {
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