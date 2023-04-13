<template>
    <div class="login-form">
        <h1>Login</h1>
        <form>

            <div>
                <label for=" email">Email:</label>
                <input type="text" id="email" v-model="employeeLoginRequest.email" />

            </div>
            <div>
                <label for=" password">Password:</label>
                <input type="password" id="password" v-model="employeeLoginRequest.password" />
            </div>
            <div>
                <button type="submit" @click="login">Login</button>
            </div>
        </form>
        <p>
            <router-link to="/setPassword">Set Password</router-link>
        </p>

        <p>{{ message }}</p>
    </div>
</template>

<script>
import LoginService from "../services/LoginService";
import '../App.css'

export default {
    name: "mainLogin",
    data() {
        return {
            employeeLoginRequest: { email: "", password: "" },
            message: ""
        }

    },
    methods: {
        login(event) {
            event.preventDefault();
            if (this.employeeLoginRequest.email === "" || this.employeeLoginRequest.password === "") {
                window.alert("Please enter your credentials");
            } else {
                LoginService.employeeLogin(this.employeeLoginRequest)
                    .then(response => {
                        let item = response.data;
                        localStorage.setItem('eid', item.employee.id);
                        localStorage.setItem('role', item.role);
                        if (item.role === 1 || item.role === 2) {
                            this.$router.push({ name: "auditorNavigation" });
                        }
                        else {
                            this.$router.push({ name: "auditeeNavigation" });

                        }

                    })
                    .catch(error => {
                        this.employeeLoginRequest.email = "";
                        this.employeeLoginRequest.password = "";
                        this.message = error.response.data.message;
                        window.alert("Some of the credentials are wrong. Try again please");
                        console.log(error.response.data);
                    })
            }



        }

    },

    mounted() {

        this.message = "";

    }
}

</script>
<style></style>