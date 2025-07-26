import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(img => `
        <li class="gallery-item">
            <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p><b>Likes:</b> ${img.likes}</p>
                <p><b>Views:</b> ${img.views}</p>
                <p><b>Comments:</b> ${img.comments}</p>
                <p><b>Downloads:</b> ${img.downloads}</p>
            </div>
        </li>`).join('');

    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = '';
}

export function showLoader() {
    loader.style.display = 'block';
}

export function hideLoader() {
    loader.style.display = 'none';
}

export function showLoadMoreBtn() {
    loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreBtn() {
    loadMoreBtn.style.display = 'none';
}