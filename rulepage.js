let back_button=document.querySelector("#back");
let checkSurrender = document.getElementById("surrender");
back_button.addEventListener("click",()=>{
    
    let detail = {
        surrender_rule: checkSurrender.checked
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
    
    
}
window.addEventListener("load", () => {
    setDetails();
});