import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-2635b-default-rtdb.firebaseio.com/",
});

export default instance;
