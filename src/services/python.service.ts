import axios from "axios";
let URL = 'https://api.undetectable.ai/'

axios.defaults.headers.common['api-key'] = 'API_KEY';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const submitDocument = async (body: any, params: any) => {
    const response = await axios.post(URL + 'submit-document', body, { params });
    return response.data;
}

const retrieveDocument = async (id: any) => {
    const response = await axios.get(URL + 'document', { params: { id } });
    return response.data;
}

const listDocuments = async (page: Number) => {
    const response = await axios.get(URL + 'list', { params: { page } });
    return response.data;
}

export default {
    submitDocument,
    retrieveDocument,
    listDocuments
}