import fetchImgs from "./fetch-imgs";

const Refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    imgsGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

Refs.searchForm.addEventListener('submit', onSearchForm);
Refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchForm(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value;
    fetchImgs(searchQuery)
        .then(hits => console.log(hits));
};

async function onLoadMore(e) {
    fetchImgs(searchQuery)
        .then(hits => console.log(hits));
}