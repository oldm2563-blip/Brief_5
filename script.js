
const questioninput = document.getElementById("question");
const answerinput = document.getElementById("answer");
const btnofpower = document.getElementById("createflashcard");
const cardcontainer = document.getElementById("flashcard");
/*----------------------------------------------------------*/
const categoryinput = document.getElementById("inputcategory");
const addcategorybtn = document.getElementById("add-category-btn");
const filter = document.getElementById("filter");


let cards =JSON.parse(localStorage.getItem("flashcards")) || [];
let categories = JSON.parse(localStorage.getItem("category")) || [];

document.querySelector("#flashcard-form")?.addEventListener("submit", e => e.preventDefault());


addcategorybtn.addEventListener("click" , () => {
    const newcategory = categoryinput.value.trim();
    if(newcategory === ""){
        alert("make sure to fill out the box");
        return;
    }
    let exist = false;
    for(let i = 0 ; i < filter.options.length ; i++){
        if(newcategory === filter.options[i].value){
            exist = true;
            break;
        }
    }
    if(exist){
        alert("pick a diffrent name");
        categoryinput.value = "";
        return;
    }


    const option = document.createElement("option");
    option.value = newcategory;
    option.textContent = newcategory;
    filter.appendChild(option);
    

    categories.push(newcategory)
    localStorage.setItem("category" , JSON.stringify(categories))

    categoryinput.value = "";

})




btnofpower.addEventListener("click" , ()=> {
    const question = questioninput.value.trim();
    const answer = answerinput.value.trim();
    const drop = filter.value;

    if(question === "" || answer === ""){
        alert("the two must be filled");
        return;
    }
    const card = document.createElement("div");
    card.classList.add("flashcard");
    card.dataset.drop = drop;
    card.innerHTML = `
    <div class = "card-inner">
        <div class= "front">${question}</div>
        <div class= "back">${answer}</div>
    </div>
    `;
     card.addEventListener("click" , () =>{
     card.classList.toggle("flipped")
 })
 cardcontainer.appendChild(card);
 cards.push({question, answer, drop});
 localStorage.setItem("flashcards", JSON.stringify(cards));

 questioninput.value = "";
 answerinput.value = "";
})

window.addEventListener("DOMContentLoaded", () =>{
    categories.forEach(e => {
        const option = document.createElement("option");
        option.value = e;
        option.textContent = e;
        filter.appendChild(option);
    })
    

    cards.forEach(({question, answer, drop}) => {
        const card = document.createElement("div");
        card.classList.add("flashcard");
        card.dataset.drop = drop;
        card.innerHTML = `
            <div class="card-inner">
                <div class="front">${question}</div>
                <div class="back">${answer}</div>
            </div>
        `;
        card.addEventListener("click", () => card.classList.toggle("flipped"));
        cardcontainer.appendChild(card);
    });
})




filter.addEventListener("change", ()=>{
    const selected = filter.value;
    document.querySelectorAll(".flashcard").forEach(card =>{
        if(card.dataset.drop === selected){
        card.style.display = "block"
    }
    else{
        card.style.display = "none"
    }
    })
})

/*-------------------------------------------------------------------*/
