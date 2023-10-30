import fetchImgs from "./fetch-imgs";
import galleryImgsTpl from '../templates/gallery-items.hbs';

const Refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    imgsGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

Refs.searchForm.addEventListener('submit', onSearchForm);
Refs.loadMoreBtn.addEventListener('click', onLoadMore);
Refs.loadMoreBtn.style.display = 'none';

let searchQuery;
let currentQuery;
let page;
const perPage = 40;
const API_IMGS_LIMIT = 500;

async function onSearchForm(e) {
    e.preventDefault();    
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
     if (currentQuery === searchQuery) {          
        alert("Error! Ви вже виконуєте пошук за даною ключовою фразою");
        Refs.searchInput.value = '';
        return;
    }; 
     if (searchQuery === '') {
        alert("Error! Потрібно вказати ключову фразу для пошуку");
        Refs.searchInput.value = '';
        return;
    };
    try {
        page = 1;
        console.log(`searchQuery: ${searchQuery}, page before fetch: ${page}`);
        let hits = await fetchImgs(searchQuery, page);
        console.log('Hits: ', hits);
        if (hits && hits.length > 0) {            
            Refs.searchInput.value = '';
            Refs.imgsGallery.innerHTML = '';            
            galleryImgsMarckup(hits);
            page++;
            Refs.loadMoreBtn.style.display = 'block';
            currentQuery = searchQuery;
            console.log(`searchQuery: ${searchQuery}, page after fetch: ${page}`);
        } else {
            alert("No results.");
            Refs.loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error(error.message);   
        } 
};

async function onLoadMore(e) {    
    try {
        console.log(`searchQuery: ${searchQuery}, page before fetch: ${page}`);
        let hits = await fetchImgs(searchQuery, page);        
        console.log('Hits: ', hits);
        if (hits && hits.length > 0) {
            Refs.searchInput.value = '';
            Refs.imgsGallery.innerHTML = '';
            galleryImgsMarckup(hits);

            if (perPage * page >= API_IMGS_LIMIT) {
                alert("API is limited to return a maximum of 500 images per query. You can't load more with free API key.");
                Refs.loadMoreBtn.style.display = 'none';
                return;
            }

            page++;
            Refs.loadMoreBtn.style.display = 'block';
            currentQuery = searchQuery;
            console.log(`searchQuery: ${searchQuery}, page after fetch: ${page}`);
        } else {
            alert("No more results.");
            Refs.loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error(error.message);   
        } 
}

function galleryImgsMarckup(hits) {
    Refs.imgsGallery.insertAdjacentHTML('beforeend', galleryImgsTpl(hits));
}