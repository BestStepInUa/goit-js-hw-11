import fetchImgs from "./fetch-imgs";
import galleryImgsTpl from '../templates/gallery-items.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

Notify.init({
    width: '300px',
    position: 'left-top',
    fontSize: '16px',    
});

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

async function onSearchForm(e) {
    e.preventDefault();    
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
     if (currentQuery === searchQuery) {          
        Notify.warning("Error! You are already searching for this keyword");
        Refs.searchInput.value = '';
        return;
    }; 
     if (searchQuery === '') {
        Notify.warning("Error! You must specify a keyword to search for.");
        Refs.searchInput.value = '';
        return;
    };
    try {
        page = 1;
        console.log(`searchQuery: ${searchQuery}, page before fetch: ${page}`);
        let data = await fetchImgs(searchQuery, page);
        console.log('Hits: ', data.hits);
        if (data.hits && data.hits.length > 0) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`)
            Refs.searchInput.value = '';
            Refs.imgsGallery.innerHTML = '';            
            galleryImgsMarckup(data.hits);
            page++;
            Refs.loadMoreBtn.style.display = 'block';
            currentQuery = searchQuery;
            console.log(`searchQuery: ${searchQuery}, page after fetch: ${page}`);
        } else {
            Notify.failure("Sorry, there are no images matching your search query. Please try again");
            Refs.loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error(error.message);   
        } 
};

async function onLoadMore(e) {    
    try {
        console.log(`searchQuery: ${searchQuery}, page before fetch: ${page}`);
        let data = await fetchImgs(searchQuery, page);
        console.log('Hits: ', data.hits);
        if (data.hits && data.hits.length > 0) {
            Refs.searchInput.value = '';
            Refs.imgsGallery.innerHTML = '';
            galleryImgsMarckup(data.hits);

            if (perPage * page >= data.totalHits) {
                Notify.failure("We're sorry, but you've reached the end of search results.");
                Refs.loadMoreBtn.style.display = 'none';
                return;
            }

            page++;
            Refs.loadMoreBtn.style.display = 'block';
            currentQuery = searchQuery;
            console.log(`searchQuery: ${searchQuery}, page after fetch: ${page}`);
        } else {
            Notify.failure("No more results.");
            Refs.loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error(error.message);   
        } 
}

function galleryImgsMarckup(hits) {
    Refs.imgsGallery.insertAdjacentHTML('beforeend', galleryImgsTpl(hits));
}