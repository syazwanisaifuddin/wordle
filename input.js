import allWords from './words.js';

const checkBtn = document.getElementById('check-btn');
const resetBtn = document.getElementById('reset-btn')

//simpan letter dlm array 
let inputHasLetter =[];

function inputFieldPushToArray(){
    const hasLetterInputField = document.querySelectorAll('.letter-input-field');
    inputHasLetter = Array.from(hasLetterInputField).map(input=>input.value.toLowerCase());
  
    return inputHasLetter;
}


// declare array dengan panggil element yg berkait dgn butang eliminate letters
const mustNotHaveLetter = document.querySelectorAll('.eliminate-letter-button');   
const mustNotHaveLetterArray = []

//function untuk register value butang yang ditekan ke dalam array
mustNotHaveLetter.forEach(button =>{
    button.addEventListener("click",event=>{
        event.target.classList.toggle('active');
        const letter = button.textContent; // declare textcontent butang2 dalam variable "letter"
        const index = mustNotHaveLetterArray.indexOf(letter); //dia carik VALUE INDEX of letter. kalau xde dia boh -1, kalau ade dia bagi nombo kedudukan index

        if(index !==-1){
            // jika dlm array ada letter,
            //array.splice(kedudukan index, tolak 1 value)
            mustNotHaveLetterArray.splice(index,1);
        }else{
            //jika takde letter tu
            // push dalam array
            mustNotHaveLetterArray.push(letter);
        }
    console.log(mustNotHaveLetterArray);// cek array state jadi tak jadi
        })

      
    })



    // filtering functions
    const doNotContainLetter =(word,letter)=>!word.toLowerCase().includes(letter.toLowerCase()) && !word.toUpperCase().includes(letter.toUpperCase());
    
    const hasLetterInPosition = (word, letter,position)=> {
        if (letter === undefined|| letter==='') return true

        return word[position] === letter
    }

  
    function showPossibleWords2(){
        var possibleWords = document.getElementById("possible-words");

        var gridContainer = document.createElement("div");
        gridContainer.classList.add("grid-container");

        var itemsCount = document.createElement('div');
        itemsCount.classList.add("items-count");

        const filteredWords = allWords.filter(word =>
            mustNotHaveLetterArray.every(letter=>doNotContainLetter(word,letter))
            &&inputHasLetter.every((letter,index)=>hasLetterInPosition(word,letter,index))
            )
        
//display on ouutput
        filteredWords.forEach((item)=>{
            var gridItem = document.createElement("div");
            gridItem.textContent = item;
            gridContainer.appendChild(gridItem)
        
            })
    possibleWords.innerHTML="";
    itemsCount.textContent= `There are ${filteredWords.length} possible word(s)`;
    possibleWords.appendChild(itemsCount)
    possibleWords.appendChild(gridContainer)

    }

    checkBtn.addEventListener("click", function(){
        inputFieldPushToArray()
        console.log("hasLetter : ",inputHasLetter);
        showPossibleWords2();
        console.log("hasNoLetter : ",mustNotHaveLetterArray);
    });

  

    resetBtn.addEventListener("click",function(){
        location.reload();
    })
    
    
    

