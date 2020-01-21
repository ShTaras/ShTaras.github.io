const item = document.querySelectorAll('.item');

for (let i = 0; i < item.length; i++) {
    item[i].onclick = function () {
        for (let j = 0; j < item.length; j++) {
            item[j].classList.remove('item-active');
        }
        this.classList.add('item-active');
    }
}






