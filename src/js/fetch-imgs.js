import axios from "axios";

export default async function fetchImgs(search, page) {
    const BASE_API_URL = 'https://pixabay.com/api/';
    const API_KEY = '40254298-f0122bcc19424dfed523c5016';

    const params = new URLSearchParams({
        key: API_KEY,
        q: `${search}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: `${page}`,
    });

    axios.get(`${BASE_API_URL}`, {
        params,
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.data);
};    
            