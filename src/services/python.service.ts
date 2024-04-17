import axios from "axios";
let URL = ''
const callPythonAPI = async (data: any) => {
    const response = await axios.post(URL, data);
    return response.data;
};