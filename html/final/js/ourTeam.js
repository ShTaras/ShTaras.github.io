const teamMember = document.querySelectorAll('.teamMember');
const memberInfo = document.querySelectorAll('.memberInfo');

for (let i = 0; i < teamMember.length; i++) {

    teamMember[i].onclick = function () {

        for (let i = 0; i < teamMember.length; i++) {
            memberInfo[i].classList.remove('memberInfo-active');
        }

        for (let j = 0; j < teamMember.length; j++) {
            teamMember[j].classList.remove('teamMember-active');
            memberInfo[i].classList.add('memberInfo-active');
        }
        this.classList.add('teamMember-active');

    }
}

