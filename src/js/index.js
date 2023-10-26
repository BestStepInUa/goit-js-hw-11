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

let searchQuery = '';

async function onSearchForm(e) {
    e.preventDefault();
    Refs.imgsGallery.innerHTML = '';
    searchQuery = e.currentTarget.elements.searchQuery.value;
    fetchImgs(searchQuery)
        .then(galleryImgsMarckup);    
};

async function onLoadMore(e) {    
    fetchImgs(`${ searchQuery }`)
        .then(galleryImgsMarckup);
}

function galleryImgsMarckup(hits) {
    Refs.imgsGallery.insertAdjacentHTML('beforeend', galleryImgsTpl(hits));
}