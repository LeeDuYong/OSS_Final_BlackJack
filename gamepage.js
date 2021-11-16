let current_deck = [];
let dealer_cards = [];
let player_cards = [];
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
function show_card_img(bd,idx,dealer_cards,player_cards,dorp){
    let img = document.createElement("img");
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
        img.style = "position: absolute; top:105px; left:"+String((365+(idx)*17))+"px;"
        img.id='dealer_card'+(idx+1);
    }
    else{
        img.style = "position: absolute; top:375px; left:"+String((365+(idx)*17))+"px;"
        img.id='player_card'+(idx+1);
    }
    bd.appendChild(img);
}
function clear(){
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
    if (player_sum>21)
        sp.innerText=sp.innerText+"졌습니다..."
    else if (dealer_sum>21)
        sp.innerText=sp.innerText+"이겼습니다!"
    else{
        if (dealer_sum==player_sum){
            sp.innerText=sp.innerText+"비겼습니다."
        }
        else if (dealer_sum>player_sum){
            sp.innerText=sp.innerText+"졌습니다..."
        }
        else{
            sp.innerText=sp.innerText+"이겼습니다!"
        }
    }
    bd.appendChild(sp)
}
function player_bust(bd,player_sum){
    sp=document.createElement("span")
    sp.className='temp'
    sp.style="color:white; position:absolute; top:250px;left:135px;font-size:25px"
    sp.innerText="나의 카드 합 : "+player_sum+"\n"+"졌습니다..."+"\n"
    bd.appendChild(sp)
}
function dealer_bust(bd,dealer_sum){
    sp=document.createElement("span")
    sp.className='temp'
    sp.style="color:white; position:absolute; top:250px;left:135px;font-size:25px"
    sp.innerText="딜러 카드 합 : "+dealer_sum+"\n"+"이겼습니다!"+"\n"
    bd.appendChild(sp)
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
let start_button = document.querySelector("#start");
start_button.addEventListener("click",()=>{
    clear();
    initdeck();
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
})

let hit_button = document.querySelector("#hit");
hit_button.addEventListener("click",()=>{
    var twocards=[];
    var current_length=current_deck.length;
    while(current_deck.length>current_length-2){
        twocards.push(current_deck.splice(Math.floor(Math.random()*current_deck.length),1)[0])
    }
    dealer_cards.push(twocards[0])
    player_cards.push(twocards[1])
    var len = dealer_cards.length
    let bd = document.querySelector("body");
    show_card_img(bd,len-1,dealer_cards,player_cards,'dealer')
    show_card_img(bd,len-1,dealer_cards,player_cards,'player')
    var dealer_sum=0
    var dealer_ace_cnt=0
    var player_sum=0
    var player_ace_cnt=0
    for (var i=0;i<len;i++){
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
        player_bust(bd,player_sum)
    }
    else if(dealer_sum>21){
        document.querySelectorAll("img").forEach(img=>{
            if(img.id.includes("dealer")){
                img.remove();
            }
        })
        for(var i=0;i<dealer_cards.length;i++){
            show_card_img(bd,i,dealer_cards,player_cards,'dealer')
        }
        dealer_bust(bd,dealer_sum)
    }
})


let stay_button = document.querySelector("#stay");
stay_button.addEventListener("click",()=>{
    var dealer_sum = 0
    var player_sum = 0
    var len = dealer_cards.length
    var dealer_ace_cnt = 0
    var player_ace_cnt = 0
    for (var i=0;i<len;i++){
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
        else{
            dealer_sum+=num;
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
    document.querySelectorAll("img").forEach(img=>{
        if(img.id.includes("dealer")){
            img.remove();
        }
    })
    for(var i=0;i<len;i++){
        show_card_img(bd,i,dealer_cards,player_cards,'dealer')
    }
    for(var i=len;i<dealer_cards.length;i++){
        setTimeout(show_card_img,1000*(i-len+1),bd,i,dealer_cards,player_cards,'dealer')
    }
    setTimeout(game_end,1000*(dealer_cards.length-len+1),bd,player_sum,dealer_sum)
})