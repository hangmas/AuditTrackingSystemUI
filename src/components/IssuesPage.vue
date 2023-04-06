<template>
    <div id="menu buttons">
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
    

</style>
