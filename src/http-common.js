import axios from "axios";

export default axios.create({

    baseURL: "http://localhost:8080/api", // to call the api
    headers :{
        "Content-type" : "application/json"
    }
})
