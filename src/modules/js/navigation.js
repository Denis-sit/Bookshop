export default function showingTheMenu(){
    const menuNav = document.querySelector('.header__links'),
          mobMenuBtn = document.querySelector('.header__menu-mob');
    mobMenuBtn.addEventListener('click', () =>{
        menuNav.classList.toggle('hide');
    });
}

