<template>
    <div id="menubuttons">
        <button id="EditButton" @click="handleEditIssue">Edit</button>
        <button id="View Details" @click="handleViewIssue">View Details</button>
        <button>
            <select class="filterbutton" name="filterbutton" v-model="filterLabel" @change="handlerStatus">
                    <option value="filterlabel" selected>Filter</option>
                    <option value="outstanding" >By Outstanding Issues</option>
                    <option value="closed">By Closed Issues</option>              
                    <option value="highrisk">By High Risk Issues</option>
                    <option value="mediumrisk">By Medium Risk Issues</option>
                    <option value="lowrisk">By Low Risk Issues</option>

                </select>
        </button>
    </div>
    <div>
        <IssueList :getSelectedIssue="getSelectedIssue"
                   :selectedFiltering="filterLabel"/>
    </div>
    <br>
    <br>
    <!-- <button @click="backToDashboardHandler">DISPLAY NAV BAR OR DASHBOARD</button> -->
    
</template>

<script>
import IssueList from "./IssueList.vue"

export default {
    name: "IssuesPageAuditee",
    components: {
        IssueList,
    },
    data(){
        return{
            selectedIssueChecked:{},
            filterLabel:"filterlabel",
            filterSelection:""
        }
    },

    methods:{
        handleCreateIssue(event){
            event.preventDefault();
            this.$router.push({name:"IssueCreate"});

        },
        handleEditIssue(event){
            event.preventDefault();
            const isEmpty = Object.keys(this.selectedIssueChecked).length === 0;
            if(isEmpty){
                window.alert("Please check one of the issues you want to edit");
            }else{
                
                this.$router.push({name:"IssueEditAuditee"});
            }
        },
        //method to get the selected item from the child component and store it in a local variable of the parent.
        //this is then stored in local storage so that this can be passed down to another component
        getSelectedIssue(selectedIssue){
            this.selectedIssueChecked = selectedIssue;
            localStorage.setItem("selectedIssuePassed",JSON.stringify(this.selectedIssueChecked));
           
        },

        //method to handle the viewing of a particular issue
        handleViewIssue(event){
            event.preventDefault();
            const isEmpty = Object.keys(this.selectedIssueChecked).length === 0;
            if(isEmpty){
                window.alert("Please check one of the issues you want to view");
            }else{
                this.$router.push({name:"IssueViewDetail"});
            }
        },

        // backToDashboardHandler(event){
        //     event.preventDefault();
        //     this.$router.push({name:"auditeeNavigation"});
        // }
    }
}

</script>

<style scoped>
button {
    margin-left: 8px;
}

#menubuttons{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-end;
    
}

</style>
