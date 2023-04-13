<template>
    <div id="menubuttons">
        <button id="CreateButton" @click=handleCreateIssue>Create</button>
        <button id="EditButton" @click="handleEditIssue">Edit</button>
        <button id="DeleteButton" @click="handleDelete">Delete</button>
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
        <!-- props passed down to the child component for use -->
        <IssueList :getSelectedIssue="getSelectedIssue"
                    :selectedFiltering="filterLabel"/>
    </div>
    <br>
    <br>
    <!-- <button @click="backToDashboardHandler">DISPLAY NAV BAR OR DASHBOARD</button> -->
</template>

<script>
import IssueService from "@/services/IssueService";
import IssueList from "./IssueList.vue"

export default {
    name: "IssuesPage",
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

        //method to handle the create button.  when clicked, it lead to the create issue page
        handleCreateIssue(event){
            event.preventDefault();
            this.$router.push({name:"IssueCreate"});

        },

        //method to handle edit issue.  it includes a dialogue box to handle if no item is selected
        handleEditIssue(event){
            event.preventDefault();
            const isEmpty = Object.keys(this.selectedIssueChecked).length === 0;
            if(isEmpty){
                window.alert("Please place a checkmark before an issue you want to edit");
            }else{
                
                this.$router.push({name:"IssueEdit"});
            }
        },

        //method to handle the delete button.  it includes a window alert to confirm to proceed or not.
        handleDelete(event){
            event.preventDefault();
            const isEmpty = Object.keys(this.selectedIssueChecked).length === 0;
            if(isEmpty){
                window.alert("Please place a checkmark before an issue you want to delete");
            }else{
                if (window.confirm('Are you sure you want to proceed?')) {   
            
              
                   IssueService.deleteIssue(this.selectedIssueChecked.id)
                    .then(response =>{
                        console.log(response.data)
                        
                    })

                    .catch(error =>{
                        console.log(error);
                    })
                 
                window.confirm('You have succesfully deleted the issue.');
                //this reloads the page after the update
                window.location.reload();
                
                // this.$router.push({name:"IssuesPage"});
                } else {
                    
                    // this.$router.push({name:"IssuesPage"});
                 }
                 
                 window.location.reload();
            }
        },

        //method to get the selected item from the child component and store it in a local variable of the parent.
        //this is then stored in local storage so that this can be passed down to another component
        getSelectedIssue(selectedIssue){
            this.selectedIssueChecked = selectedIssue;
            localStorage.setItem("selectedIssuePassed",JSON.stringify(this.selectedIssueChecked));
           
        },

        //method to handle the viewing of a particular issue.
        handleViewIssue(event){
            event.preventDefault();
            const isEmpty = Object.keys(this.selectedIssueChecked).length === 0;
            if(isEmpty){
                window.alert("Please place a checkmark before an issue you want to view");
            }else{
                this.$router.push({name:"IssueViewDetail"});
            }
        },

        // backToDashboardHandler(event){
        //     event.preventDefault();
        //     this.$router.push({name:"auditorNavigation"});
        // }
     
        
    }
}

</script>

<style scoped>
/* button {
    margin-left: 8px;
}

#menubuttons{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-end;
    
} */

</style>
