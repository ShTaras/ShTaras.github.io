const item = document.querySelectorAll('.item');

for(let i=0;i<item.length;i++) {
    item[i].onclick =function () {
        this.classList.toggle('item-active');
    }

}






