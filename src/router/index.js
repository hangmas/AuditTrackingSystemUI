import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/MainLogin.vue";
import employeeProfile from "../components/EmployeeProfile.vue";
import IssuesPage from "../components/IssuesPage.vue";
import dashboardAuditor from "../components/DashboardAuditor.vue"
import dashboardAuditee from "../components/DashboardAuditee.vue"
const routes =[
{

    path :"/",
    alias: "/login", //its a nickname for the path
    name: "Login",
    component: Login
},
{
path :"/profile",
name :"employeeProfile",
component : employeeProfile

},
{
path : "/dashboardAuditor",
name : "dashboardAuditor",
component : dashboardAuditor
},

{
    path : "/dashboardAuditee",
    name : "dashboardAuditee",
    component : dashboardAuditee
    },

{
    path: "/issues",
    name: "IssuesPage",
    component: IssuesPage
},
];//this is an array containing the path which is the url


const router = createRouter({
    history: createWebHistory(), // when user click back button, it will resolve it for us
    routes
})

//need to export so other javascript can use it
export default router;