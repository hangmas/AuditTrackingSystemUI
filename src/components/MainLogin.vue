<template>
    <div>
        <h4>Login</h4>
        <form>
            <div>
                <label for ="employeeID">Employee ID</label>
                <input type="text" id="employeeID" v-model="loginForm.employeeID"/> 
            </div>

            <div>
                <label for ="password">Password: </label>
                <input type="password" id="password" v-model="loginForm.password"/>
            </div>
        </form>
        <div>
                <button type="submit" @click="login">Login</button>
                <button type="submit" @click="display">Display</button>
            </div>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import LoginService from '@/services/LoginService';
//import { response } from 'express';
//import EmployeeDataService from '../services/EmployeeDataService'



export default {
    name: "mainLogin",
    data(){  //it is a function, it will return a value
        return {
            loginForm : {email: "", password: ""},
            employee: null,
            message: ""
        }
    },

    methods:{
        login(event){
            event.preventDefault();
            LoginService.login(this.loginForm)
                .then(response =>{
                    this.employee = response.data;
                    console.log(this.employee);
                })
                .catch(error =>{
                    console.log(error.response.data);
                })
        }
        // login(event){
        //     event.preventDefault();
        //   //  EmployeeDataService.get()
        //     LoginService.login(this.employeeLoginRequest) // all the data from login will be send to LoginService.js, it has an api in that file
        //     .then(response => {
        //         let employee = response.data;
        //         console.log(employee);
        //     //     this.employeeID = 222;
        //     //     localStorage.setItem('eid',this.employeeID);
        //     //    // this.message = "test";
        //     //     this.$router.push({name:"dashboardAuditee"});

        //     }
        //     )

        //     .catch(error =>{
        //         console.log(error);
        //     });

        // }
    },

    mounted(){
        this.message = "";

    }

}
</script>

<style>
</style>