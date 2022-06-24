export class SkillBar {
    constructor() {
        this.skills = ['Hitpoints', 'Fighting', 'Defense', 'Healing'];
        this.leftColumn = document.getElementById('leftColumn');
        this.rightColumn = document.getElementById('rightColumn');
    }

}

export function createSkillBar(document) {
    const skillBar = new SkillBar();

    skillBar.skills.forEach(element => {
        let div = document.createElement('p');
        div.innerText = element;
        skillBar.leftColumn.appendChild(div);
        let div2 = document.createElement('p');
        div2.innerText = '0';
        skillBar.rightColumn.appendChild(div2);
    });
    
    return skillBar;
}