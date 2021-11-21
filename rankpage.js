let back_button=document.querySelector("#back");
let user_ranks = [];
back_button.addEventListener("click",()=>{
    window.location.href = "mainpage.html";
})
function show_user_ranking(){
    let rankList = localStorage.getItem("users");
    if(!rankList) return;

    user_ranks = JSON.parse(rankList);
    user_ranks.sort(function(a, b){
        if(a.money > b.money){
            return -1;
        }
        else if(a.money < b.money){
            return 1;
        }
    })
    let count = 1;
    let rankTable = document.querySelector("#rank_table");
    /*
    user_ranks.forEach(rank => {
        let row = rankTable.insertRow();
        let cell_rankNum = row.insertCell();
        let cell_userName = row.insertCell();
        let cell_userMoney = row.insertCell();
        cell_rankNum.innerText =  count;
        cell_userName.innerText = rank.name;
        cell_userMoney.innerText = (rank.money * 10000).toLocaleString('ko-KR');
        count++;
        if(count > 5){
            break;
        }
    })
    */
    for(count = 1; count <= user_ranks.length; count++){
        if(count > 5){
            break;
        }
        let rank = user_ranks[count - 1];
        let row = rankTable.insertRow();
        let cell_rankNum = row.insertCell();
        let cell_userName = row.insertCell();
        let cell_userMoney = row.insertCell();
        cell_rankNum.innerText =  count;
        cell_userName.innerText = rank.name;
        cell_userMoney.innerText = (rank.money * 10000).toLocaleString('ko-KR');
    }
    if(count <= 5){
        for(let i = count; i <= 5; i++){
            let row = rankTable.insertRow();
            let cell_rankNum = row.insertCell();
            let cell_userName = row.insertCell();
            let cell_userMoney = row.insertCell();
            cell_rankNum.innerText =  count;
            cell_userName.innerText = "-";
            cell_userMoney.innerText = "-";
        }
    }
}
window.addEventListener("load", () => {
    show_user_ranking();
});