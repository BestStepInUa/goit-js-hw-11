import fetchImgs from "./fetch-imgs";

fetchImgs('dog', 1)

const Refs = {
    searchForm: document.querySelector('.search-form'),
    imgsGallery: document.querySelector('.gallery'),
    loadMoreBt: document.querySelector('.load-more')
}

// Refs.searchForm.addEventListener('submit', onSearchFormSubmit);

// async function onSubmitSearchForm(evt) {
//     evt.preventDefault();
// };