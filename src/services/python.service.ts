import { SubmitDocumentBody } from "@/models/ReuestBody";
import axios from "axios";
let URL = 'https://api.undetectable.ai/'

axios.defaults.headers.common['api-key'] = process.env.NEXT_PUBLIC_UD_API_KEY;
axios.defaults.headers.post['Content-Type'] = 'application/json';


const submitDocument = async (body: SubmitDocumentBody) => {
    const response = await axios.post(URL + 'submit', body);
    return response.data;
}

const retrieveDocument = async (id: String) => {
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