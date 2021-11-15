var cards = ["1a","1b","1c","1d","2a","2b","2c","2d","3a","3b","3c","3d","4a","4b","4c","4d","5a","5b","5c","5d",
            "6a","6b","6c","6d","7a","7b","7c","7d","8a","8b","8c","8d","9a","9b","9c","9d","10a","10b","10c","10d",
            "Ja","Jb","Jc","Jd","Qa","Qb","Qc","Qd","Ka","Kb","Kc","Kd"];
        
let card = [];
let dealer = [];
let num=cards.length;

function start() {
    const element=document.getElementById('cards');
    const element2=document.getElementById('dealer');
    const newdiv=document.createElement('playercard');
    const newdiv2=document.createElement('dealercard');
    for(let i = 0; i <2; i++) {
        const random = Math.floor(Math.random()*cards.length);
        card.push=cards[random];
        cards.splice(random, 1);
        let newText=document.createTextNode(cards[random]+" ");
        newdiv.appendChild(newText);
        element.appendChild(newdiv);
    }
            
    for(let i=0; i<2;i++)
    {
        const random = Math.floor(Math.random()*cards.length);
        dealer.push=cards[random];
        cards.splice(random, 1);
        let newText2=document.createTextNode(cards[random]+" ");
        newdiv2.appendChild(newText2);
        element2.appendChild(newdiv2);
    }
}

start();