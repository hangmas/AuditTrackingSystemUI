<template>
    <div>
        <h4>Login</h4>
        <form>

            <div>
                <label for=" email">Email:</label>
                <input type="text" id="email" v-model="employeeLoginRequest.email"/>

            </div>
            <div>
                <label for=" password">Password:</label>
                <input type="password" id="password" v-model="employeeLoginRequest.password"/>
            </div>
            <div>
                <button type="submit" @click="login">Login</button>
            </div>
        </form>
        <p>
                    <router-link to="/signup"> Login</router-link>
                </p>

        <p>{{ message }}</p>
    </div>



</template>

<script>
import LoginService from "../services/LoginService";


export default{
    name : "employeeLogin",
    data(){
        return{
            employeeLoginRequest: {email:"", password:""},

            message: ""
        }

    },
    methods:{
        login(event){
            event.preventDefault();

            LoginService.login(this.employeeLoginRequest)
            .then(response => {
                let employee = response.data;
                console.log(employee);
                localStorage.setItem('eid',employee.id);
                this.message = employee;
                if (employee.role === 1){
                    this.$router.push({ name: "dashboardAuditor"});
                }
                else {
                    this.$router.push({ name: "dashboardAuditee"});

                }
                
            })
            .catch(error => {
                this.employeeLoginRequest.studentId = "";
                this.employeeLoginRequest.password = "";
                this.message = error.response.data.message;
                console.log(error.response.data);
            })


        }

    },

mounted(){

    this.message = "";

}
}

</script>
<style>

</style>