import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/MainLogin.vue";
import employeeProfile from "../components/EmployeeProfile.vue";
import IssuesPage from "../components/IssuesPage.vue";
import dashboardAuditor from "../components/DashboardAuditor.vue"
import IssueCreate from "../components/IssueCreate.vue"
import IssueEdit from "../components/IssueEdit.vue"
import IssueViewDetail from "../components/IssueViewDetail.vue"

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
path : "/dashboard",
name : "dashboardAuditor",
component : dashboardAuditor
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
    path: "/viewIssues",
    name: "IssueViewDetail",
    component: IssueViewDetail

}


];//this is an array containing the path which is the url


const router = createRouter({
    history: createWebHistory(), // when user click back button, it will resolve it for us
    routes
})

//need to export so other javascript can use it
export default router;