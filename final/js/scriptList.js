let item = document.querySelectorAll('.item');

let i;
for(let i=0;i<item.length;i++) {
    item[i].addEventListener("click", myFunction);
}
function myFunction() {
    this.classList.toggle('item-active');
}



