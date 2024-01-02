export default function showingTheMenu(){
    const menuNav = document.querySelector('.header__links'),
          mobMenuBtn = document.querySelector('.header__menu-mob');
    console.log(mobMenuBtn);
    mobMenuBtn.addEventListener('click', () =>{
        menuNav.classList.toggle('hide');
        console.log('s');
    });
}

