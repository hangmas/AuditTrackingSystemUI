<template>
    <table>
        <thead>
            <th>Report Title</th>
            <th>Issue Title</th>
            <th>Risk Rating</th>
            <th>Department Responsible</th>
            <th>Approved Deadline</th>
        </thead>
        <tbody>
            <tr v-for="row in issues" :key="row.id">
                <td>{{ row.reportTitle }}</td>
                <td>{{ row.issueTitle }}</td>
                <td>{{ row.riskRating }}</td>
                <td>{{ row.departmentResponsible }}</td>
                <td>{{ row.approvedDeadline }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import IssueService from '@/services/IssueService';
export default{
    name: "issueReports",
    data(){
        return{
            issues:[],
        }
    },
    methods:{
        getOutstandingIssues(){
            IssueService.getIssues()
                .then(response => {
                    this.issues = response.data;
                    console.log(this.issues);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted(){
        this.getOutstandingIssues();
    }

}
</script>

<style>
</style>