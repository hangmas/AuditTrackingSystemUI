<template>
    <div>
        <select id="selectSection" v-model="chosenSectionId">
            <option v-for="(opt, index) in options" :key="index" :value="index">
                {{ opt }}
            </option>
        </select>
    </div>
    <div v-if="tableReport">
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
                    <td>{{  new Date(row.approvedDeadline  * 1000).toLocaleDateString()}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-if="chartReport" class="chartReport">
        <p>
            <input type="radio" id="department" value="0" v-model="chosenFilter">
            <label for="deparment">{{ filters[0] }}</label><br>
            <input type="radio" id="riskRating" value="1" v-model="chosenFilter">
            <label for="deparment">{{ filters[1] }}</label><br>
        </p>
        <Bar id="reportChart" v-if="chartData"  :data="chartData" :width="70" :height="20"/>
    </div>
</template>

<script>
import IssueService from '@/services/IssueService';
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
ChartJS.register(Title,Tooltip,Legend,BarElement,CategoryScale, LinearScale)
export default {
    name: "issueReports",
    components:{Bar},
    data() {
        return {
            issues: [],
            options: ["Outstanding Issues as at Date of Report", "Closed Issues During 1 Year Period", "Issues Raised During 1 Year Period", "Issues with filters"],
            filters: ["Department", "Risk Rating"],
            chosenSectionId: -1,
            chosenFilter: -1,
            status: "",
            tableReport: false,
            chartReport: false,
            chartData: null,
            // chartData:{
            //     labels: ['January', 'February','March'],
            //     datasets: [{ data: [25, 20, 12]}]
            // },
            chartOptions:{
                response: true
            },
            loaded:true

        }
    },
    methods: {
        handleSelectionClick(event) {
            event.preventDefault();

        },
        getIssuesList() {
            IssueService.getIssuesByStatus(this.status, true)
                .then(response => {
                    this.issues = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getDeparmentChartData(){
            
            IssueService.getIssuesByDepartment()
                .then(response =>{
                    this.chartData = response.data;
                })
                .catch(error =>{
                    console.log(error);
                })
        },

        getRiskByRatingChartData(){
            IssueService.getIssuesByRiskRating()
                .then(response =>{
                    this.chartData = response.data;
                })
                .catch(error =>{
                    console.log(error);
                })
        },
        refreshChartFilter(selectedFilter){
            if(selectedFilter == 0){
                this.getDeparmentChartData();
            }else if(selectedFilter == 1){
                this.getRiskByRatingChartData();
            }
        },

        refreshReportView(selectedOption){
            switch (selectedOption) {
                case 0:
                    this.status = "Outstanding";
                    this.tableReport = true;
                    this.chartReport = false;
                    this.getIssuesList();
                    break;
                case 1:
                    this.status = "Closed",
                        this.tableReport = true;
                        this.chartReport = false;
                    this.getIssuesList();
                    break;
                case 2:
                    this.status = "all",
                        this.tableReport = true;
                        this.chartReport = false;
                    this.getIssuesList();
                    break;
                case 3:
                    this.tableReport = false;
                    this.chartReport = true;
                    this.chosenFilter = this.filters.indexOf("Department");
                    break;
                default:
                    this.tableReport = false;
                    this.chartReport = false;


            }
        }
    },
    mounted() {
        this.chosenSectionId = 0
        //this.getChartData();
    },
    watch: {
        chosenSectionId(newSelection) {
            this.refreshReportView(newSelection);
        },
        chosenFilter(newSelection){
            console.log(newSelection);
            this.refreshChartFilter(newSelection);
        }
    }

}
</script>

<style></style>