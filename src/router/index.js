import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/MainLogin.vue";
import employeeProfile from "../components/EmployeeProfile.vue";
import dashboardAuditor from "../components/DashboardAuditor.vue"

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
}

];//this is an array containing the path which is the url


const router = createRouter({
    history: createWebHistory(), // when user click back button, it will resolve it for us
    routes
})

//need to export so other javascript can use it
export default router;