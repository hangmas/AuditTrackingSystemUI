<template>
    <div>
        <h4>Login</h4>
        <form>
            <div>
                <label for ="employeeID">Employee ID</label>
                <input type="text" id="employeeID" v-model="employeeLoginRequest.employeeID"/> 
            </div>

            <div>
                <label for ="password">Password: </label>
                <input type="password" id="password" v-model="employeeLoginRequest.password"/>
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
//import LoginService from '@/services/LoginService';
import EmployeeDataService from '../services/EmployeeDataService'



export default {
    name: "employeeLogin",
    data(){  //it is a function, it will return a value
        return {
            employeeLoginRequest : {employeeID: "", password: ""},
            message: ""
        }
    },

    methods:{
        login(event){
            event.preventDefault();
            EmployeeDataService.get()
          //  LoginService.login(this.employeeLoginRequest) // all the data from login will be send to LoginService.js, it has an api in that file
            .then(response => {
                let employee = response.data;
                console.log(employee);
                this.employeeID = 222;
                localStorage.setItem('eid',this.employeeID);
               // this.message = "test";
                this.$router.push({name:"dashboardAuditee"});

            }
            )

            .catch(error =>{
                console.log(error);
            });

        }
    },

    mounted(){
        this.message = "";

    }

}
</script>

<style>
</style>