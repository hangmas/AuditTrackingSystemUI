<template>
    <div id="menubuttons">
        <button id="CreateButton">Create</button>
        <button id="EditButton">Edit</button>
        <button id="DeleteButton">Delete</button>
        <button id="View Details">View Details</button>
    </div>
    <div>
        <IssueList />
    </div>
</template>

<script>
import IssueList from "./IssueList.vue"

export default {
    name: "IssuesPage",
    components: {
        IssueList,
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
