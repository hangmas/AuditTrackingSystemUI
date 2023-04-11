<template>
    
    <div>
        <div>
            <br/>
            <img class="logo" src="../assets/audit.jpg"/>
            <h3>Signup</h3><br />
            <h3/>
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
export default{
    
    name : "employeeLogin",
    data(){
        return{
            employeeSignupRequest: {email:"", password:""},
            message: ""
        }

    },
    methods:{
        signup(event){
            event.preventDefault();
            LoginService.login(this.employeeLoginRequest)
            .then(response => {
                let employee = response.data;
                console.log(employee);
                localStorage.setItem('user-info',employee.data.id);
                this.message = employee;
                this.$router.push({ name: "dashboardAuditor"});
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
.logo{
    margin-left: auto;
    margin-right: auto;
    width: 160px;
    height: 160px;
    
    
    
}

.formm input{
    width:300px;
    height:40px;
    padding-left: 20px;
    display: block;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid skyblue;


}
.formm button{
    width: 320px;
    height: 40px;
    border: 1px solid lightblue;
    color: #fff;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    background-color: skyblue;

}

</style>