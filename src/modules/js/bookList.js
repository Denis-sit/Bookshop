const apiKey = "AIzaSyDvIpoSKK0AQ3kbwdqvaIdvQzdqKtItLf0"; 
const url = `https://www.googleapis.com/books/v1/volumes?q=subject:Business&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`;
const parentContainer = document.querySelector('.book-list__content'),
      loadingBtn = document.querySelector('.book-list__load');


function requestingData(){
    fetch(url)
        .then(response => response.json())
        .then(data => renderContent(data.items))
        .catch(error => console.error('Error:', error))
};

function renderContent(data){
    data.forEach((book, i) => {
        const info = book.volumeInfo;
        parentContainer.innerHTML += `
        <div class="book-card">
            <img src=${info.imageLinks.smallThumbnail ? info.imageLinks.smallThumbnail : '../../image/book.svg'} alt="image">
            <div class="book-card__info">
                <p class="book-card_author">${info.authors ? info.authors : ''}</p>
                <p class="book-card__name">${info.title ? info.title : ''}</p>
                <div class="book-card__rating">
                    <p class="book-card__reviews">${info.ratingsCount ? info.ratingsCount : ''}
                                                  ${info.ratingsCount ? 'review' : ''}  </p>
                </div>
                <p class="book-card__description">${info.description ? info.description : ''}</p>
                <p class="book-card__price">${book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : ''}
                                            ${book.saleInfo.retailPrice ? book.saleInfo.retailPrice.currencyCode : ''}</p>
                <button class="book-card__button">buy now</button>
            </div>
        </div>
        `
        if(info.averageRating){
            let cardRating = document.querySelectorAll('.book-card__rating')
            let average = document.createElement('div');
            average.classList.add('book-card__star');
            for(let index = 1; index <= info.averageRating; index++){
                average.textContent += `☆`;
            }
            cardRating[i].prepend(average);
        }
        
    });
};

function loadingBooks(){
    loadingBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        requestingData();
    });
};

export default function displayingContent(){
    requestingData();
    loadingBooks();
}