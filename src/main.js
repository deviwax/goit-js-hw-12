import { getImagesByQuery } from "./js/pixabay-api";
import {
    createGallery, clearGallery,
    showLoader, hideLoader,
    showLoadMoreBtn, hideLoadMoreBtn,
} from './js/render-functions';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async e => {
    e.preventDefault();

    const query = input.value.trim();
    if (!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search term!',
            position: 'topRight',
        });
        return;
    }

    currentPage = 1;
    currentQuery = query;
    hideLoadMoreBtn();
    showLoader();
    clearGallery();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.info({
                title: '❌',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                backgroundColor: '#ef4040',
            });
            return;
        }

        createGallery(data.hits);

        if (data.hits.length < 15 || data.hits.length >= totalHits) {
            iziToast.info({
                title: 'End',
                message: 'Weʼre sorry, but youʼve reached the end of search results.',
                position: 'topRight'
            });
            hideLoadMoreBtn();
        } else {
            showLoadMoreBtn();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            position: 'topRight',
            message: 'Something went wrong. Please try again later.',
        });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    hideLoadMoreBtn();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);

        const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
        window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

        const displayed = document.querySelectorAll('.gallery-item').length;
        if (displayed >= totalHits) {
            iziToast.info({
                title: 'End',
                message: 'Weʼre sorry, but youʼve reached the end of search results.',
                position: 'topRight',
            });
            hideLoadMoreBtn()
        } else {
            showLoadMoreBtn();
        }
    } catch {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong loading more.',
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
});