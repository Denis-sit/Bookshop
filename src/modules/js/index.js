import '../scss/style.scss';
import showingTheMenu from './navigation.js';
import sliderNext from './slider.js';
import displayingContent from './bookList.js'

document.addEventListener('DOMContentLoaded', () =>{
    showingTheMenu();
    sliderNext();
    displayingContent();
});
