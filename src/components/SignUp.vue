<template>
    
    <div class="login-form">
        <div class="header-with-logo">
            <img class="logo" src="../assets/audit.jpg"/>
            <h2>Signup</h2>
        </div>
        <form>
            <div class="formm">
                <label for="email" >Email</label>
                <input type="text" id="email" v-model="employeeSignupRequest.email"/>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="employeeSignupRequest.password"/>
                <button type="submit" v-on:click="signUp">Sign Up</button>
                <p>
                    <router-link to="/login"> Login</router-link>
                </p>
            </div>
        </form>     
        

    </div>
</template>
<script>
import LoginService from "../services/LoginService";
import "../App.css"
export default{
    
    name : "employeeLogin",
    data(){
        return{
            employeeSignupRequest: {email:"", password:""},
            message: ""
        }

    },
    methods:{
        signUp(event){
            event.preventDefault();
            LoginService.user(this.employeeSignupRequest)
            .then(response => {
                console.log("",response)
                LoginService.setup(this.employeeSignupRequest,response.data.id)
                .then(response2 => {
                    let employee = response2.data;
                    console.log("Response to",employee);
                localStorage.setItem('user-info',employee.id);
                this.message = employee;
                this.$router.push({ name: "dashboardAuditor"});

                })
                .catch(error=>{
                    console.log(error.response.data);

                })
                
            })
            .catch(error => {
                this.employeeSignupRequest.studentId = "";
                this.employeeSignupRequest.password = "";
                this.message = error.response.data.message;
                console.log(error.response.data);
            })
            
        }

    },
};

</script>
<style>

</style>