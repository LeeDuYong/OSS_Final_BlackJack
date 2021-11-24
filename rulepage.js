let back_button=document.querySelector("#back");
let checkSurrender = document.getElementById("surrender");
let checkPush = document.getElementById("push");
let checkHitsoft17 = document.getElementById("hit_soft_17");
let checkblackjack=document.getElementById("blackjack");

back_button.addEventListener("click",()=>{
    let detail = {
        surrender_rule: checkSurrender.checked,
        hit_soft_17: checkHitsoft17.checked,
        push: checkPush.checked,
        blackjack: checkblackjack.checked,
    };
    localStorage.removeItem("details");
    localStorage.setItem("details", JSON.stringify(detail));
    window.location.href = "mainpage.html";
})
function setDetails(){
    let details = localStorage.getItem("details");
    if(!details) return;
    let current_details = JSON.parse(details);
    checkSurrender.checked = current_details.surrender_rule;
    checkPush.checked = current_details.push;
    checkHitsoft17.checked = current_details.hit_soft_17;
    checkblackjack.checked = current_details.blackjack;
}
window.addEventListener("load", () => {
    setDetails();
});