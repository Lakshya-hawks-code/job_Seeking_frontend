import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials:true
});


 const apiCall = async (endPoint ,  postdata, contentType) =>
{
  console.log(localStorage.getItem("token"))
    try {
      const headers = 
      {
        Accept: "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }    
      if(contentType === "multipart")
      {
        headers["Content-Type"] = "multipart/form-data"
      }
      else
      {
        headers["Content-Type"] = "application/json";
      }
        const {data} = await api.post(endPoint,postdata, { headers})
        console.log(data)
       
        return data;
        
    } catch (error) {
        console.log(error)
    }
}


export default apiCall

