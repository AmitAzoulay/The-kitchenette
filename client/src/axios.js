import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,}
)

instance.interceptors.response.use(
  res => res,
  err => {
    if(err.code === "ERR_CONNECTION_REFUSED" || err.code === "ERR_NETWORK") {
        console.log("Server down")
    }
    return Promise.reject(err)
  }
)
export default instance
