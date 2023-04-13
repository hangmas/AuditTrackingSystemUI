import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/MainLogin.vue";
import employeeProfile from "../components/EmployeeProfile.vue";
import IssuesPage from "../components/IssuesPage.vue";
import dashboardAuditor from "../components/DashboardAuditor.vue";
import dashboardAuditee from "../components/DashboardAuditee.vue";
import IssueCreate from "../components/IssueCreate.vue";
import IssueEdit from "../components/IssueEdit.vue";
import IssueViewDetail from "../components/IssueViewDetail.vue";
import IssuePageAuditee from "../components/IssuePageAuditee.vue";
import IssueEditAuditee from "../components/IssueEditAuditee.vue";
import IssuesReport from "../components/IssuesReports.vue";
import NavigationPageAuditee from "../components/NavigationPageAuditee.vue";
import NavigationPageAuditor from "../components/NavigationPageAuditor.vue";
import RoleDec from "../components/RoleDec.vue";

import SetPassword from "../components/SetPassword.vue"


const routes = [

    {
        path: "/roleDec",
        name: "roleDec",
        component: RoleDec
    },
    {

        path: "/auditeeNavigation",
        name: "auditeeNavigation",
        component: NavigationPageAuditee
    },
    {

        path: "/auditorNavigation",
        name: "auditorNavigation",
        component: NavigationPageAuditor
    },
    {
        path: "/",
        alias: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/setPassword",
        name: "SetPassword",
        component: SetPassword


    },
    {
        path: "/profile",
        name: "employeeProfile",
        component: employeeProfile

    },
    {
        path: "/dashboard",
        name: "dashboardAuditor",
        component: dashboardAuditor
    },
    {
        path: "/dashboardAuditor",
        name: "dashboardAuditor",
        component: dashboardAuditor
    },

    {
        path: "/dashboardAuditee",
        name: "dashboardAuditee",
        component: dashboardAuditee
    },

    {
        path: "/issues",
        name: "IssuesPage",
        component: IssuesPage
    },

    {
        path: "/createissues",
        name: "IssueCreate",
        component: IssueCreate
    },

    {
        path: "/editIssues",
        name: "IssueEdit",
        component: IssueEdit
    },
    {
        path: "/dashboard",
        name: "dashboardAuditee",
        component: dashboardAuditee
    },

    {
        path: "/viewIssues",
        name: "IssueViewDetail",
        component: IssueViewDetail

    },
    {
        path: "/issuepageauditee",
        name: "IssuePageAuditee",
        component: IssuePageAuditee

    },

    {
        path: "/issueeditauditee",
        name: "IssueEditAuditee",
        component: IssueEditAuditee

    },

    {
        path: "/reports",
        name: "IssuesReports",
        component: IssuesReport
    }


];//this is an array containing the path which is the url


const router = createRouter({
    history: createWebHistory(), // when user click back button, it will resolve it for us
    routes
})


//need to export so other javascript can use it
export default router;