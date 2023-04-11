<template>
    <div>
        <h4>Login</h4>
        <form>
          <div>
                <label for ="employeeID">Employee Email</label>
                <input type="text" name="email" v-model="LoginForm.email"/> 
            </div>

            <div>
                <label for ="password">Password: </label>
                <input type="password" name="password" v-model="LoginForm.password"/>
            </div> 
        </form>
        <div>
                <button type="submit" @click="login">Login</button>
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
            LoginForm : {email: "", password: ""},
            message: ""
        }
    },

    methods:{
        login(event){
            event.preventDefault();

          LoginService.login(this.LoginForm) // all the data from login will be send to LoginService.js, it has an api in that file
            .then(response => {
                let employee = response.data;
                console.log(employee);
                console.log(employee.employee.id);
                console.log(employee.role);
                localStorage.setItem('eid',employee.employee.id);
                localStorage.setItem('role',employee.role);
                if(employee.role === 2 || employee.role ===1)
                {
                this.$router.push({name:"dashboardAuditor"});
                }
                else
                {
                this.$router.push({name:"dashboardAuditee"});
                }

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