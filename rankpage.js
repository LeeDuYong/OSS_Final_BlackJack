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
    let count = 0;
    user_ranks.forEach(rank => {
        let rankTable = document.querySelector("#rank_table");
        let row = rankTable.insertRow();
        let cell_rankNum = row.insertCell();
        let cell_userName = row.insertCell();
        let cell_userMoney = row.insertCell();
        cell_rankNum.innerText =  count + 1;
        cell_userName.innerText = rank.name;
        cell_userMoney.innerText = rank.money;
        count++;
    })
}
window.addEventListener("load", () => {
    show_user_ranking();
});