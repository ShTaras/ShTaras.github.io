

let plusCount = document.querySelector('#plusCount');
let minusCount = document.querySelector('#minusCount');
let count = document.querySelector('#count');
let i = 1;

count.value = i;

plusCount.onclick = function () {
    i++;
    count.value = i;
}

minusCount.onclick = function () {
    if(i != 1) {
        i--;
        count.value = i;
    }
}