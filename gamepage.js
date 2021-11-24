let current_deck = [];
let dealer_cards = [];
let player_cards = [];
let current_money= 1000;
let current_bet= 100;
let current_result= [0,0,0];
let double=false;
let current_nickname;
let current_details;
var startsound= new Audio("card_sound/cardPlace.mp3");
var cardsound = new Audio("card_sound/cardSlide.mp3");

document.querySelectorAll("button").forEach(btn=>{
    if (btn.id == "up" ||btn.id == "down" || btn.id == "start"||btn.id == "exit"){
        btn.disabled=false;
    }
    else{
        btn.disabled=true;
    }
})
function loadUsers() {
    let player = localStorage.getItem("player");
    if (!player) return;

    let current_player = JSON.parse(player);
    
    current_nickname = current_player.name;
    current_money = current_player.money;
    current_result = current_player.result;
}
window.addEventListener("load", () => {
    loadUsers();
    cm=document.getElementById("current money")
    cm.innerText = "현재 보유 금액 : "+current_money+" 만원\n전적 : "+current_result[2]+'승 '+current_result[0]+'패 '+current_result[1]+'무'
    let details = localStorage.getItem("details");
    if(!details) return;
    current_details = JSON.parse(details);
});
function initdeck(){
    current_deck = [];
    dealer_cards=[];
    player_cards=[]
    for (var i=1; i<5;i++){
        for (var j=1; j<14;j++){
            current_deck.push({shape: i,num: j})
        }
    }
}

function show_card_img(bd,idx,dealer_cards,player_cards,dorp,anim=true){
    let img = document.createElement("img");
    let opacity=0
    if (dorp=='dealer'){
        a=dealer_cards[idx]['shape']
        b=dealer_cards[idx]['num']
    }
    else{
        a=player_cards[idx]['shape']
        b=player_cards[idx]['num']
    }
    img.src="card_imgs//"+a+"_"+b+".png";
    img.height=115;
    img.width=85;
    img.className="rounded"
    if (dorp=='dealer'){
        img.style = "position: absolute; top:105px; left:"+String((365+(idx)*17))+"px; opacity:0"
        img.id='dealer_card'+(idx+1);
    }
    else{
        img.style = "position: absolute; top:375px; left:"+String((365+(idx)*17))+"px;opacity:0"
        img.id='player_card'+(idx+1);
    }
    bd.appendChild(img)
    if (anim)
    {let timer = setInterval(()=>{
        opacity += 0.1;
        img.style.opacity=opacity;
        if (opacity==1){
            clearInterval(timer)
        }
    },100);}
    else{
        img.style.opacity=1;
    }
}
function clear(){
    double=false;
    document.querySelectorAll("img").forEach(img=>{
        img.remove();
    })
    document.querySelectorAll("span").forEach(sp=>{
        if (sp.className=='temp')
            sp.remove();
    })
}
function game_end(bd,player_sum,dealer_sum){
    sp=document.createElement("span")
    sp.className='temp'
    sp.style="color:white; position:absolute; top:250px;left:135px;font-size:25px"
    sp.innerHTML="딜러 카드 합 : "+dealer_sum+"\n"+"나의 카드 합 : "+player_sum+"\n"
    if(double===true)
    {
        if (player_sum>21)
        {   
            sp.innerText=sp.innerText+"졌습니다..."
            current_result[0]+=1;
            current_money-=current_bet*2;
        }
        else if (dealer_sum>21)
        {   
            sp.innerText=sp.innerText+"이겼습니다!"
            current_result[2]+=1;
            current_money+=current_bet*2;
        }
        else{
            if (dealer_sum==player_sum){
                if (current_details.push)
                {
                    sp.innerText=sp.innerText+"비겼습니다."
                    current_result[1]+=1;
                }
                else {
                    sp.innerText=sp.innerText+"이겼습니다!"
                    current_result[2]+=1;
                    current_money+=current_bet*2;
                }
            }
            else if (dealer_sum>player_sum){
                sp.innerText=sp.innerText+"졌습니다..."
                current_result[0]+=1;
                current_money-=current_bet*2;
            }
            else{
                sp.innerText=sp.innerText+"이겼습니다!"
                current_result[2]+=1;
                current_money+=current_bet*2;
            }
        }
    }
    else{
        if (player_sum>21)
            {sp.innerText=sp.innerText+"졌습니다..."
            current_result[0]+=1;
            current_money-=current_bet;}
        else if (dealer_sum>21)
            {sp.innerText=sp.innerText+"이겼습니다!"
            current_result[2]+=1;
            current_money+=current_bet}
        else{
            if (dealer_sum==player_sum){
                if (current_details.push)
                {
                    sp.innerText=sp.innerText+"비겼습니다."
                    current_result[1]+=1;
                }
                else {
                    sp.innerText=sp.innerText+"이겼습니다!"
                    current_result[2]+=1;
                    current_money+=current_bet;
                }
            }
            else if (dealer_sum>player_sum){
                sp.innerText=sp.innerText+"졌습니다..."
                current_result[0]+=1;
                current_money-=current_bet
            }
            else{
                sp.innerText=sp.innerText+"이겼습니다!"
                current_result[2]+=1;
                current_money+=current_bet
            }
        }
    }
    bd.appendChild(sp)
    btnlist = ['hit','stay','doubledown','surrender']
    document.querySelectorAll("button").forEach(btn=>{
        if (btn.id == btnlist[0] || btn.id == btnlist[1] || btn.id == btnlist[2] || btn.id == btnlist[3]){
            btn.disabled=true;
        }
        if (btn.id == "up" ||btn.id == "down"){
            btn.disabled=false;
        }
    })
    cm=document.getElementById("current money")
    cm.innerText = "현재 보유 금액 : "+current_money+" 만원\n전적 : "+current_result[2]+'승 '+current_result[0]+'패 '+current_result[1]+'무'
    localStorage.removeItem("player");
    let user = {
        name: current_nickname,
        money: current_money,
        result: current_result
    };
    localStorage.setItem("player", JSON.stringify(user));
    if (current_money>=current_bet)
    {
        start=document.getElementById("start");
        start.disabled=false;
    }
}
function player_bust(bd,player_sum){
    sp=document.createElement("span")
    sp.className='temp'
    sp.style="color:white; position:absolute; top:250px;left:135px;font-size:25px"
    sp.innerText="나의 카드 합 : "+player_sum+"\n"+"졌습니다..."+"\n"
    bd.appendChild(sp)
    btnlist = ['hit','stay','doubledown','surrender']
    document.querySelectorAll("button").forEach(btn=>{
        if (btn.id == btnlist[0] || btn.id == btnlist[1] || btn.id == btnlist[2] || btn.id == btnlist[3]){
            btn.disabled=true;
        }
        if (btn.id == "up" ||btn.id == "down"){
            btn.disabled=false;
        }
    })
    current_result[0]+=1;
    if(double===true){
        current_money-=current_bet*2;
    }
    else{
        current_money-=current_bet
    }
    cm=document.getElementById("current money")
    cm.innerText = "현재 보유 금액 : "+current_money+" 만원\n전적 : "+current_result[2]+'승 '+current_result[0]+'패 '+current_result[1]+'무'
    if (current_money>=current_bet)
    {
        start=document.getElementById("start");
        start.disabled=false;
    }
    localStorage.removeItem("player");
    let user = {
        name: current_nickname,
        money: current_money,
        result: current_result
    };
    localStorage.setItem("player", JSON.stringify(user));
}
function player_surrender(bd){
    sp=document.createElement("span")
    sp.className='temp'
    sp.style="color:white; position:absolute; top:250px;left:135px;font-size:25px"
    sp.innerText="Surrender\n"+"졌습니다..."+"\n"
    bd.appendChild(sp)
    btnlist = ['hit','stay','doubledown','surrender']
    document.querySelectorAll("button").forEach(btn=>{
        if (btn.id == btnlist[0] || btn.id == btnlist[1] || btn.id == btnlist[2] || btn.id == btnlist[3]){
            btn.disabled=true;
        }
        if (btn.id == "up" ||btn.id == "down"){
            btn.disabled=false;
        }
    })
    current_result[0]+=1;
    current_money-=current_bet/2;
    cm=document.getElementById("current money")
    cm.innerText = "현재 보유 금액 : "+current_money+" 만원\n전적 : "+current_result[2]+'승 '+current_result[0]+'패 '+current_result[1]+'무'
    if (current_money>=current_bet)
    {
        start=document.getElementById("start");
        start.disabled=false;
    }
    localStorage.removeItem("player");
    let user = {
        name: current_nickname,
        money: current_money,
        result: current_result
    };
    localStorage.setItem("player", JSON.stringify(user));
}
function check_ace(sum,a_cnt){
    if(a_cnt==0){
        return [sum,a_cnt];
    }
    else{
        if(sum>21){
            return check_ace(sum-10,a_cnt-1);
        }
        else{
            return [sum,a_cnt];
        }
    }
}
function player_blackjack(bd){
    sp=document.createElement("span")
    sp.className='temp'
    sp.style="color:white; position:absolute; top:250px;left:135px;font-size:25px"
    sp.innerText="Blackjack!\n"+"이겼습니다..."+"\n"
    bd.appendChild(sp)
    btnlist = ['hit','stay','doubledown','surrender']
    document.querySelectorAll("button").forEach(btn=>{
        if (btn.id == btnlist[0] || btn.id == btnlist[1] || btn.id == btnlist[2] || btn.id == btnlist[3]){
            btn.disabled=true;
        }
        if (btn.id == "up" ||btn.id == "down"){
            btn.disabled=false;
        }
    })
    current_result[2]+=1;
    if(current_details.blackjack===true)
    {
        current_money+=current_bet*2;
    }
    else
    {
        current_money+=current_bet*1.5;
    }
    cm=document.getElementById("current money")
    cm.innerText = "현재 보유 금액 : "+current_money+" 만원\n전적 : "+current_result[2]+'승 '+current_result[0]+'패 '+current_result[1]+'무'
    if (current_money>=current_bet)
    {
        start=document.getElementById("start");
        start.disabled=false;
    }
    localStorage.removeItem("player");
    let user = {
        name: current_nickname,
        money: current_money,
        result: current_result
    };
    localStorage.setItem("player", JSON.stringify(user));
}

function dealer_blackjack(bd){
    document.getElementById("dealer_card1").remove();
    for(var i=0;i<2;i++){
        show_card_img(bd,i,dealer_cards,player_cards,'dealer',false)
    }
    sp=document.createElement("span")
    sp.className='temp'
    sp.style="color:white; position:absolute; top:250px;left:135px;font-size:25px"
    sp.innerText="Dealer Blackjack!\n"+"졌습니다..."+"\n"
    bd.appendChild(sp)
    btnlist = ['hit','stay','doubledown','surrender']
    document.querySelectorAll("button").forEach(btn=>{
        if (btn.id == btnlist[0] || btn.id == btnlist[1] || btn.id == btnlist[2] || btn.id == btnlist[3]){
            btn.disabled=true;
        }
        if (btn.id == "up" ||btn.id == "down"){
            btn.disabled=false;
        }
    })
    current_result[0]+=1;
    if(current_details.blackjack===true)
    {
        current_money-=current_bet*2;
    }
    else
    {
        current_money-=current_bet*1.5;
    }
    cm=document.getElementById("current money")
    cm.innerText = "현재 보유 금액 : "+current_money+" 만원\n전적 : "+current_result[2]+'승 '+current_result[0]+'패 '+current_result[1]+'무'
    if (current_money>=current_bet)
    {
        start=document.getElementById("start");
        start.disabled=false;
    }
    localStorage.removeItem("player");
    let user = {
        name: current_nickname,
        money: current_money,
        result: current_result
    };
    localStorage.setItem("player", JSON.stringify(user));
}

let start_button = document.querySelector("#start");
start_button.addEventListener("click",()=>{
    clear();
    initdeck();
    startsound.play();
    loadUsers();
    document.querySelectorAll("button").forEach(btn=>{
        if (btn.id == "up" ||btn.id == "down"||btn.id=="start"){
            btn.disabled=true;
        }
        else if(btn.id == "surrender"){
            btn.disabled = !(current_details.surrender_rule);
        }
        else{
            btn.disabled=false;
        }
    })
    if (current_money<2*current_bet)
    {
        document.querySelector("#doubledown").disabled=true;
    }
    var fourcards=[];
    var current_length=current_deck.length;
    while(current_deck.length>current_length-4){
        fourcards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
    }
    dealer_cards.push(fourcards[0])
    dealer_cards.push(fourcards[1])
    player_cards.push(fourcards[2])
    player_cards.push(fourcards[3])
    let bd = document.querySelector("body");
    let img = document.createElement("img");
    img.src="card_imgs//back.jpg";
    img.height=115;
    img.width=85;
    img.id='dealer_card1';
    img.className="rounded"
    img.style="position: absolute; top:105px; left:365px;"
    bd.appendChild(img);
    show_card_img(bd,1,dealer_cards,player_cards,'dealer');
    show_card_img(bd,0,dealer_cards,player_cards,'player');
    show_card_img(bd,1,dealer_cards,player_cards,'player');
    if(player_cards[0]['num']==1 && player_cards[1]['num']>=10 || player_cards[1]['num']==1 && player_cards[0]['num']>=10)
    {
        let bd = document.querySelector("body");
        setTimeout(player_blackjack,1000,bd);
    }
    if(dealer_cards[0]['num']==1 && dealer_cards[1]['num']>=10 || dealer_cards[1]['num']==1 && dealer_cards[0]['num']>=10)
    {
        let bd = document.querySelector("body");
        setTimeout(dealer_blackjack,1000,bd);
    }
})

let hit_button = document.querySelector("#hit");
hit_button.addEventListener("click",()=>{
    player_cards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
    cardsound.play();
    var len = player_cards.length
    let bd = document.querySelector("body");
    show_card_img(bd,len-1,dealer_cards,player_cards,'player')
    var player_sum=0
    var player_ace_cnt=0
    for (var i=0;i<player_cards.length;i++){
        if(player_cards[i]['num']==1){
            player_sum+=11;
            player_ace_cnt+=1;
        }
        else if(player_cards[i]['num']>=10){
            player_sum+=10;
        }else
            player_sum+=player_cards[i]['num'];
    }
    sum_cnt=check_ace(player_sum,player_ace_cnt)
    player_sum=sum_cnt[0]
    player_ace_cnt=sum_cnt[1]
    if (player_sum>21){
        setTimeout(player_bust,1000,bd,player_sum)
    }
})

let stay_button = document.querySelector("#stay");
stay_button.addEventListener("click",()=>{
    var dealer_sum = 0
    var player_sum = 0
    var dealer_ace_cnt = 0
    var player_ace_cnt = 0
    for (var i=0;i<2;i++){
        if(dealer_cards[i]['num']==1){
            dealer_sum+=11;
            dealer_ace_cnt+=1
            }
        else if(dealer_cards[i]['num']>=10){
            dealer_sum+=10;
        }
        else 
            dealer_sum+=dealer_cards[i]['num'];
    }
    sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
    dealer_sum=sum_cnt[0]
    dealer_ace_cnt=sum_cnt[1]
    
    
    while(dealer_sum<=16){
        dealer_cards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
        num = dealer_cards[dealer_cards.length-1]['num']
        if (num==1){
            dealer_ace_cnt+=1;
            dealer_sum+=11;
            sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
            dealer_sum=sum_cnt[0]
            dealer_ace_cnt=sum_cnt[1]
        }
        else if(num>=10)
        {
            dealer_sum+=10;
            sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
            dealer_sum=sum_cnt[0]
            dealer_ace_cnt=sum_cnt[1]
        }
        else{
            dealer_sum+=num;
            sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
            dealer_sum=sum_cnt[0]
            dealer_ace_cnt=sum_cnt[1]
        }
    }    
    if (current_details.hit_soft_17)
    {
        while (dealer_sum<=17 && dealer_ace_cnt>=1)
        {
            dealer_cards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
            num = dealer_cards[dealer_cards.length-1]['num']
            if (num==1){
                dealer_ace_cnt+=1;
                dealer_sum+=11;
                sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
                dealer_sum=sum_cnt[0]
                dealer_ace_cnt=sum_cnt[1]
            }
            else if(num>=10)
            {
                dealer_sum+=10;
                sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
                dealer_sum=sum_cnt[0]
                dealer_ace_cnt=sum_cnt[1]
            }
            else{
                dealer_sum+=num;
                sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
                dealer_sum=sum_cnt[0]
                dealer_ace_cnt=sum_cnt[1]
            }
        }
    }
    
    
    for (var i=0;i<player_cards.length;i++){
        if(player_cards[i]['num']==1){
            player_sum+=11;
            player_ace_cnt+=1
        }
        else if(player_cards[i]['num']>=10){
            player_sum+=10;
        }else
            player_sum+=player_cards[i]['num'];
    }
    sum_cnt=check_ace(player_sum,player_ace_cnt)
    player_sum=sum_cnt[0]
    player_ace_cnt=sum_cnt[1]
    
    let bd = document.querySelector("body");
    document.getElementById("dealer_card1").remove();
    for(var i=0;i<2;i++){
        show_card_img(bd,i,dealer_cards,player_cards,'dealer',false)
    }
    for(var i=2;i<dealer_cards.length;i++){
        setTimeout(show_card_img,1000*(i-1),bd,i,dealer_cards,player_cards,'dealer')
    }
    setTimeout(game_end,1000*(dealer_cards.length-1),bd,player_sum,dealer_sum)
})
let up_button = document.querySelector("#up");
up_button.addEventListener("click",()=>{
    current_bet+=100;
    cm=document.getElementById("bet amount")
    cm.innerText = "현재 배팅액 : "+current_bet+" 만원"
    if (current_money<current_bet)
    {
        start=document.getElementById("start");
        start.disabled=true;
    }
})
let down_button = document.querySelector("#down");
down_button.addEventListener("click",()=>{
    if (current_bet==0)
    {
        return;
    }
    current_bet-=100;
    if (current_money>=current_bet)
    {
        start=document.getElementById("start");
        start.disabled=false;
    }
    cm=document.getElementById("bet amount")
    cm.innerText = "현재 배팅액 : "+current_bet+" 만원"
})
let surrender_button = document.querySelector("#surrender");
surrender_button.addEventListener("click",()=>{
    let bd = document.querySelector("body");
    setTimeout(player_surrender,1000,bd);
})
let doubledown_button=document.querySelector("#doubledown");
doubledown_button.addEventListener("click",()=>{
    player_cards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
    cardsound.play();
    double=true;
    var len = player_cards.length
    let bd = document.querySelector("body");
    show_card_img(bd,len-1,dealer_cards,player_cards,'player')
    var dealer_sum = 0
    var player_sum = 0
    var dealer_ace_cnt = 0
    var player_ace_cnt = 0
    for (var i=0;i<2;i++){
        if(dealer_cards[i]['num']==1){
            dealer_sum+=11;
            dealer_ace_cnt+=1
            }
        else if(dealer_cards[i]['num']>=10){
            dealer_sum+=10;
        }
        else 
            dealer_sum+=dealer_cards[i]['num'];
    }
    sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
    dealer_sum=sum_cnt[0]
    dealer_ace_cnt=sum_cnt[1]
    
    while(dealer_sum<=16){
        dealer_cards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
        num = dealer_cards[dealer_cards.length-1]['num']
        if (num==1){
            dealer_ace_cnt+=1;
            dealer_sum+=11;
            sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
            dealer_sum=sum_cnt[0]
            dealer_ace_cnt=sum_cnt[1]
        }
        else if(num>=10)
        {
            dealer_sum+=10;
            sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
            dealer_sum=sum_cnt[0]
            dealer_ace_cnt=sum_cnt[1]
        }
        else{
            dealer_sum+=num;
            sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
            dealer_sum=sum_cnt[0]
            dealer_ace_cnt=sum_cnt[1]
        }
    }    
    if (current_details.hit_soft_17)
    {
        while (dealer_sum<=17 && dealer_ace_cnt>=1)
        {
            dealer_cards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
            num = dealer_cards[dealer_cards.length-1]['num']
            if (num==1){
                dealer_ace_cnt+=1;
                dealer_sum+=11;
                sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
                dealer_sum=sum_cnt[0]
                dealer_ace_cnt=sum_cnt[1]
            }
            else if(num>=10)
            {
                dealer_sum+=10;
                sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
                dealer_sum=sum_cnt[0]
                dealer_ace_cnt=sum_cnt[1]
            }
            else{
                dealer_sum+=num;
                sum_cnt=check_ace(dealer_sum,dealer_ace_cnt)
                dealer_sum=sum_cnt[0]
                dealer_ace_cnt=sum_cnt[1]
            }
        }
    }
    for (var i=0;i<player_cards.length;i++){
        if(player_cards[i]['num']==1){
            player_sum+=11;
            player_ace_cnt+=1;
        }
        else if(player_cards[i]['num']>=10){
            player_sum+=10;
        }else
            player_sum+=player_cards[i]['num'];
    }
    sum_cnt=check_ace(player_sum,player_ace_cnt)
    player_sum=sum_cnt[0]
    player_ace_cnt=sum_cnt[1]
    if (player_sum>21){
        setTimeout(player_bust,1000,bd,player_sum)
    }
    else{
        document.getElementById("dealer_card1").remove();
        for(var i=0;i<2;i++){
            show_card_img(bd,i,dealer_cards,player_cards,'dealer',false)
        }
        for(var i=2;i<dealer_cards.length;i++){
            setTimeout(show_card_img,1000*(i-1),bd,i,dealer_cards,player_cards,'dealer')
        }
        setTimeout(game_end,1000*(dealer_cards.length-1),bd,player_sum,dealer_sum)
    }
})
let exit_button = document.querySelector("#exit");
exit_button.addEventListener("click",()=>{
    localStorage.removeItem("player");
    let user = {
        name: current_nickname,
        money: current_money,
        result: current_result
    };
    localStorage.setItem("player", JSON.stringify(user));
    let user_list = [];
    let registeredUsers = localStorage.getItem("users");
    user_list = JSON.parse(registeredUsers);
    user_list = user_list.filter(u => u.name !== current_nickname);
    user_list.push(user);
    localStorage.setItem("users", JSON.stringify(user_list));
    window.location.href = "mainpage.html";
})