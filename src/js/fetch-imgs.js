import axios from "axios";

let page;
let currentQuery = '';

export default async function fetchImgs(searchQuery) {
    const BASE_API_URL = 'https://pixabay.com/api/';
    const API_KEY = '40254298-f0122bcc19424dfed523c5016';
        
    if (currentQuery !== searchQuery) {          
        page = 1;
    }
        
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page,
    });

    console.log(`searchQuery: ${searchQuery}, page до запиту: ${page}`);

    await axios.get(`${BASE_API_URL}`, {
        params,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(resp => {
            console.log(resp.data.hits);
            return resp.data.hits;
        })
        .then(() => {
            page += 1;
            console.log(`searchQuery: ${searchQuery}, page після запиту: ${page}`);
            currentQuery = searchQuery;            
        });
};    
            