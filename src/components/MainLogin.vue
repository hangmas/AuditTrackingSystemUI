<!-- <template>
    <div>
        <h4>Login</h4>
        <form>
            <div>
                <label for ="email">Employee ID : </label>
                <input type="text" id="email" v-model="employeeLoginRequest.email"/> 
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
</template> -->

<!-- <script>
import LoginService from '@/services/LoginService';
//import EmployeeDataService from '../services/EmployeeDataService'



export default {
    name: "employeeLogin",
    data(){  //it is a function, it will return a value
        return {
            employeeLoginRequest : {email: "", password: ""},
            message: ""
        }
    }, -->

    <!-- methods:{
        login(event){
            event.preventDefault();
            //LoginService.get()
            LoginService.login(this.employeeLoginRequest) // all the data from login will be send to LoginService.js, it has an api in that file
            .then(response => {
                let employee = response.data;
                console.log(employee);
                this.$router.push({name:"login"});

                
                //localStorage.setItem('eid',this.email);
                //this.message = employee;
                //this.$router.push({name:"dashboardAuditor"});

            }
            )

            .catch(error =>{
                // this.employeeLoginRequest.email="";
                // this.employeeLoginRequest.password="";
                // this.message = error.response.data.message;
                
                console.log(error.response.data);
            });

        }
    },

    mounted(){
        this.message = "";

    }

}
</script>

<style>
</style> -->
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