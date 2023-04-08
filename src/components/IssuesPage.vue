<template>
    <div id="menubuttons">
        <button id="CreateButton" @click=handleCreateIssue>Create</button>
        <button id="EditButton" @click="handleEditIssue">Edit</button>
        <button id="DeleteButton">Delete</button>
        <button id="View Details">View Details</button>
    </div>
    <div>
        <IssueList :getSelectedIssue="getSelectedIssue"/>
    </div>
</template>

<script>
import IssueList from "./IssueList.vue"

export default {
    name: "IssuesPage",
    components: {
        IssueList,
    },
    data(){
        return{
            selectedIssueChecked:{}
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
                this.$router.push({name:"IssueEdit"});
            }
        },

        //method to get the selected item from the child component and store it in a local variable of the parent.
        //this is then stored in local storage so that this can be passed down to another component
        getSelectedIssue(selectedIssue){
            this.selectedIssueChecked = selectedIssue;
            localStorage.setItem("selectedIssuePassed",JSON.stringify(this.selectedIssueChecked));
           
        }
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
