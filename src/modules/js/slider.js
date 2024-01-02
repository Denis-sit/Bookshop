const windowSlide = document.querySelector('.slider__container'),
      wrapperSlide = document.querySelector('.slider__tape'),
      controlBtns = document.querySelectorAll('.header__dot-button'),
      slideItem = document.querySelectorAll('.slider__tape img');
let index = 0, 
    width = window.getComputedStyle(windowSlide).width,
    offset = 0;      

function sliderOffset(){
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slideItem.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2); 
    }

    wrapperSlide.style.transform = `translateX(-${offset}px)`;

    index++;

    if(index > 2){
        index = 0;
    }

    repaintingTheActiveButton(index);
};

function repaintingTheActiveButton(i){
    controlBtns.forEach(item => {
        item.classList.remove('header__dot-button_active');
    })
    controlBtns[i].classList.add('header__dot-button_active');
};

function clickOnTheButton(){
    controlBtns.forEach((item, i) => {
        item.addEventListener('click', (e) =>{
            e.preventDefault();
            index = i;
            offset = +width.slice(0, width.length - 2) * index;
            wrapperSlide.style.transform = `translateX(-${offset}px)`;
            repaintingTheActiveButton(index);
        });
    });
};

export default function sliderNext(){
    setInterval(() =>{sliderOffset()}, 5000);
    clickOnTheButton();
}
