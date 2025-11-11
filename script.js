const questioninput = document.getElementById("question");
const answerinput = document.getElementById("answer");
const btnofpower = document.getElementById("createflashcard");
const cardcontainer = document.getElementById("flashcard");

let cards =JSON.parse(localStorage.getItem("flashcards")) || [];


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
});

btnofpower.addEventListener("click" , ()=> {
    const question = questioninput.value.trim();
    const answer = answerinput.value.trim();

    if(question === "" || answer === ""){
        alert("the two must be filled");
        return;
    }
    const card = document.createElement("div");
    card.classList.add("flashcard");
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
 cards.push({question, answer});
 localStorage.setItem("flashcards", JSON.stringify(cards));

 questioninput.value = "";
 answerinput.value = "";
})

window.addEventListener("DOMContentLoaded", () =>{
    cards.forEach(({question, answer}) => {
        const card = document.createElement("div");
        card.classList.add("flashcard");
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



/*-------------------------------------------------------------------*/
