<template>
<div><h1>Hello ,{{ firstName }}</h1></div>

</template>

<script>
import EmployeeDataService from '../services/EmployeeDataService'

export default{
    name: 'employeeProfile',

    data()
    {
        return{

            employee : null,
            firstName : ""
        }

    },
    methods :
    {
        retrieveEmployee(){
            //const id = localStorage.getItem('eid');
            const id = 3;
            console.log("Employee ID: " + id);
           // EmployeeDataService.get(id)
           EmployeeDataService.get()
            .then(response =>{
                this.employee = response.data; //employee will save all the data              
                this.firstName = this.employee.firstName;
                console.log(this.employee);
            })

            .catch(error =>{
                console.log(error);
            })
        }
    },

    mounted(){
        this.retrieveEmployee();
        this.firstName="";
    
    }


}

</script>