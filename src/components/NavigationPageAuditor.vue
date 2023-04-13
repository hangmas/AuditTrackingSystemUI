<template>
    <div class="header">
        <h1 class="nav-title">{{ title }}</h1>
        <div class="nav-links">
            <button v-for="tab in tabs" :key="tab" :class="['tab-button', { active: currentTab === tab }]" @click="currentTab = tab">
                {{ tab }}
            </button>

        </div>
        <!-- <ul class="nav-links">
            <li class="active"><router-link to="/" >Dashboard</router-link></li>
            <li><router-link to="">Issues</router-link></li>
            <li><router-link to="">Reports</router-link></li>
            <li><router-link to="">Settings</router-link></li>
            <li><router-link to="">Sign Out</router-link></li>
        </ul> -->
    </div>
    <div class="row">
        <component :is="componentTitles[tabs.indexOf(currentTab)]"></component>
    </div>
</template>

<script>
import DashboardAuditor from './DashboardAuditor.vue';
import IssuesReports from './IssuesReports.vue';
import IssuesPage from './IssuesPage.vue';
import MainLogin from './MainLogin.vue';
import RoleDec from './RoleDec.vue';
import '../App.css'
export default {
    name: "navigationPage",
    components: {
        DashboardAuditor,
        IssuesPage,
        IssuesReports,
        MainLogin,
        RoleDec

    },
    data() {
        return {
            title: "Audit Monitoring System",
            tabs: ['Dashboard', 'Issues', 'Reports','Sign Out'],
            componentTitles: [DashboardAuditor, IssuesPage, IssuesReports, MainLogin],
            currentTab: '',
        }
    },
    methods: {

    },
    mounted() {
        this.tabs = localStorage.getItem("role") != 2 ? this.tabs: ['Dashboard', 'Issues', 'Reports','Update Role','Sign Out'];
        this.componentTitles = localStorage.getItem("role") != 2 ? this.componentTitles: [DashboardAuditor, IssuesPage, IssuesReports, RoleDec, MainLogin];

        this.currentTab = 'Dashboard';
        
    },watch:{
        currentTab(newCurrentTab){
            switch (newCurrentTab) {
                case 'Dashboard':
                    this.title = 'Auditor Dashboard';
                    break;
                case 'Issues':
                    this.title = 'Auditor Issue Page';
                    break;
                case 'Reports':
                    this.title = 'Issue Report Page';
                    break;
                case 'Update Role':
                    this.title = 'Audit Employees Role';
                    break;
                default:
                    localStorage.removeItem("eid");
                    localStorage.removeItem("role");
                    this.$router.go(-1);
            }
        },
    }

}
</script>

<style scoped></style>