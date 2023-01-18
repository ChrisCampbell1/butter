/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/
const mobileMenuBtn = document.querySelector('#mobile-menu-btn')
const mobileMenuEl = document.querySelector('#mobile-menu')


/*----------------------------- Event Listeners -----------------------------*/
mobileMenuBtn.addEventListener('click', showMenu)


/*-------------------------------- Functions --------------------------------*/

function showMenu(evt) {
  if(mobileMenuEl.classList.contains("visible")){
    mobileMenuEl.classList.remove("visible")
  } else mobileMenuEl.classList.add("visible")
}
