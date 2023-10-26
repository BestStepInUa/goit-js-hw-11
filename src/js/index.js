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

let searchQuery;
let currentQuery;

async function onSearchForm(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value.trim();
     if (currentQuery === searchQuery) {          
        alert("Error! Ви вже виконуєте пошук за даною ключовою фразою");
        Refs.searchInput.value = '';
        return;
    } 
     if (searchQuery === '') {
        alert("Error! Потрібно вказати ключову фразу для пошуку");
        Refs.searchInput.value = '';
        return;
    }     
    Refs.searchInput.value = '';
    Refs.imgsGallery.innerHTML = '';
    currentQuery = searchQuery;    
    fetchImgs(searchQuery)
        .then(galleryImgsMarckup);
};

async function onLoadMore(e) {
    // console.log(`searchQuery: ${searchQuery}`);
    fetchImgs(`${searchQuery}`)
        .then(galleryImgsMarckup);
}

function galleryImgsMarckup(hits) {
    Refs.imgsGallery.insertAdjacentHTML('beforeend', galleryImgsTpl(hits));
}