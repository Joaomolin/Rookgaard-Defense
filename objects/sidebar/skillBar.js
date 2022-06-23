export class SkillBar {
    constructor() {
        this.skills = ['Hitpoints', 'Fighting', 'Defense', 'Healing'];
        this.leftColumn = document.getElementById('leftColumn');
        this.rightColumn = document.getElementById('rightColumn');
    }



    createSkillBar() {
        this.skills.forEach(element => {
            let div = document.createElement('p');
            div.innerText = element;
            this.leftColumn.appendChild(div);
            let div2 = document.createElement('p');
            div2.innerText = '0';
            this.rightColumn.appendChild(div2);
        });
    }
}