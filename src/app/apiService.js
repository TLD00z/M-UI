import axios from "axios";
//import { BASE_URL } from "./config";

const apiService= axios.create({
    baseURL:"http://localhost:3004" //BASE_URL 
})
apiService.interceptors.request.use(
    (request) => {
        console.log("Start request",request);
        return request
    },
    function (error){
        console.log("Request ERROR", error);
    }
)
export default apiService