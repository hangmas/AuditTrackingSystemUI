<template>
    <div>
        <h3 id="createIssueHeader">Create New Issue</h3>
        <div class="createIssueBody">
            <div class="issuedetails">
                <label class="label" for="auditreporttitle">Audit Report Title: </label>
                <br>
                <input class="inputtext" type="inputtext" name="auditreporttitletext" id="auditreporttitletextid" placeholder="" v-model="auditreporttitle">
                <br>        
                <label class="label" for="issuetitle">Audit Issue Title: </label>
                <br>
                <input class="inputtext" type="inputtext" name="auditissuetitletext" id="auditissuetitletextid" placeholder="" v-model="issuetitle">        
                <br>     
                <label class="label" for= "approveddeadline">Approved Deadline: </label>
                <br>
                <input class="inputtext" type="inputtext" name="approveddeadlineetext" id="approveddeadlineid" placeholder="" v-model="approveddeadline">
                <br>       
                <label class="label" for= "risklevel">Risk Level: </label>
                <br>
                <input class="inputtext" type="inputtext" name="riskleveltext" id="risklevelid" placeholder="" v-model="risklevel">
                <br>       
            </div> 
            
            <div class="responsibledept">
                <label class="label" for="departmentresponsible">Department Responsible: </label>
                <br>
                <input class="inputtext" type="inputtext" name="deptresponsibletext" id="deptresponsibleid" placeholder="" v-model="departmentresponsible">
                <br>        
                <label class="label" for="personresponsible">Person Responsible: </label>
                <br>
                <input class="inputtext" type="inputtext" name="personresponsibletext" id="personresponsibleid" placeholder="" v-model="personresponsible">       
                <br>        
                <label class="label" for="emailresponsible">E-mail Address: </label>
                <br>
                <input class="inputtext" type="inputtext" name="emailtext" id="emailid" placeholder="" v-model="emailresponsible">
                <br>
            </div>
            
        </div>
        <br>
        <button id="createnewissue">Create New Issue</button>
        <button id="cancelcreate">Cancel</button>
        <IssueList />

    </div>

</template>
<script>
import IssueList from "./IssueList.vue"
export default{
    name: "IssueCreate",
    data(){
        return{
        auditreporttitle:"",
        issuetitle: "",
        approveddeadline: 0,
        risklevel: "",
        departmentresponsible:"",
        personresponsible:"",
        emailresponsible:""
    
        }
        


    },
    methods: {

        createNewIssue(){
            
        }

    },

    components: {
        IssueList
    }
        
    

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