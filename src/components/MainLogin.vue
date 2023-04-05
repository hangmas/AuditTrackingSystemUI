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
import LoginService from '@/services/LoginService';



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
            LoginService.login(this.employeeLoginRequest) // all the data from login will be send to LoginService.js, it has an api in that file
            .then(response => {
                let employee = response.data;
                console.log(employee);
               // this.message = "test";
 //               this.$router.push({name:"login"});

            }
            )

            .catch(error =>{
                this.employeeLoginRequest.employeeID = "";
                this.employeeLoginRequest.password = "";
                this.message = error.response.data.message;
                console.log(error.response.data);
                this.message = "test";
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