const apiKey = "AIzaSyDvIpoSKK0AQ3kbwdqvaIdvQzdqKtItLf0";
const parentContainer = document.querySelector('.book-list__content'),
      loadingBtn = document.querySelector('.book-list__load'),
      categoryBtn = document.querySelectorAll('.book-list__button'),
      containerPurchaseCounter = document.querySelector('.header__purchase-counter');
let category = 'Architecture',
    purchaseCounter = 0,
    arrBook,
    arrButton ;


function requestingData(category){
    fetch( `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`)
        .then(response => response.json())
        .then(data => renderContent(data.items))
        .catch(error => console.error('Error:', error))
};

function renderContent(data){
    data.forEach((book, i) => {
        const info = book.volumeInfo;
        parentContainer.innerHTML += `
        <div class="book-card">
            <img src=${info.imageLinks ? info.imageLinks.smallThumbnail : 'src/image/book.svg'} alt="image">
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
                <button class="book-card__button" data-id=${book.id}>buy now</button>
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
        };
    });
    const btnBuy = document.querySelectorAll('.book-card__button');
    addingToTheCart(btnBuy, data);
    let storedBook = JSON.parse(localStorage.getItem('book'));
    applyingStylesToActiveButtons(btnBuy, storedBook);
    purchaseCounter = storedBook.length > 0 ? storedBook.length : 0;
    if(purchaseCounter){
        containerPurchaseCounter.style.display = 'block';
        containerPurchaseCounter.textContent = purchaseCounter;
    }else{
        containerPurchaseCounter.style.display = 'none';
        containerPurchaseCounter.textContent = '';
    };
};

function applyingStylesToActiveButtons(btns, storedBook){
    if(storedBook){
        btns.forEach(elem =>{
            storedBook.forEach(item =>{
                if( item && item.id === elem.dataset.id){
                    elem.classList.add('book-card__button_active');
                    elem.textContent = 'in the cart';
                };
            });
        });
    };
};

function addingToTheCart(btnBuy, book){
    btnBuy.forEach((button, i) =>{
        button.addEventListener('click', (e) =>{
            e.preventDefault();
            button.classList.toggle('book-card__button_active');
            let storedBook = localStorage.getItem('book');
            let storeButton = localStorage.getItem('button');
            if(button.textContent === 'buy now'){
                button.textContent = 'in the cart';
                purchaseCounter++;
                containerPurchaseCounter.style.display = 'block';
                containerPurchaseCounter.textContent = purchaseCounter;
                if(storedBook){
                    arrBook = JSON.parse(storedBook);
                    arrBook.push(book[i]);
                    localStorage.setItem('book', JSON.stringify(arrBook));

                    arrButton = JSON.parse(storeButton);
                    arrButton.push(button.dataset.id);
                    localStorage.setItem('button', JSON.stringify(arrButton));

                }else{
                    localStorage.setItem('book', JSON.stringify([book[i]]));
                    localStorage.setItem('button', JSON.stringify([button.dataset.id]));
                }
            }else{
                button.textContent = 'buy now';
                purchaseCounter--;
                purchaseCounter > 0 ? containerPurchaseCounter.textContent = purchaseCounter : containerPurchaseCounter.style.display = 'none';
                if(storedBook){
                    arrBook = JSON.parse(storedBook);
                    let newArrBook = arrBook.filter(item => item.id !== button.dataset.id); 
                    localStorage.setItem('book', JSON.stringify(newArrBook));  
                    arrButton = JSON.parse(storeButton);
                    let newArrButton = arrButton.filter(item => item !== button.dataset.id);
                    localStorage.setItem('button', JSON.stringify(newArrButton));
                    console.log(newArrButton);
                }
            }
        });
    });
};

function loadingBooks(category){
    loadingBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        categoryBtn.forEach(item =>{
            if(item.classList.contains('book-list__button_active')){
                category = item.dataset.category;
            }
        })
        requestingData(category);
    });
};

function choosingACategory(){
    categoryBtn.forEach(item =>{
        item.addEventListener('click', (e) =>{
            e.preventDefault();

            categoryBtn.forEach(item =>{
                item.classList.remove('book-list__button_active');
                item.parentElement.style.listStyleType = 'none';
            })

            item.classList.add('book-list__button_active');
            item.parentElement.style.listStyleType = 'disc';
            category = item.dataset.category;
            parentContainer.innerHTML = '';
            requestingData(category);
        });
    });
}

export default function displayingContent(){
    choosingACategory();
    requestingData(category);
    loadingBooks(category); 
}