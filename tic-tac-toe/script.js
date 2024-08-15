let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset-button');
let msgContainer = document.querySelector('.msg-container');
let message = document.querySelector('#msg');
let newBtn = document.querySelector('#new-btn');
let scoreX = document.querySelector('#x-score');
let scoreO = document.querySelector('#O-score');
let playerX = true;


winningPatterns = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]]
playerXCount = 0;
playerOCount = 0;

const disablegame = () =>{
    boxes.forEach(box => box.disabled = true);
}
const resetgame = () =>{
    playerX = true;
    msgContainer.classList.add('hide');
    for(box of boxes){
        box.innerText ='';
        box.disabled = false;
    }
}


const showWinner = (value) => {
    message.innerText = `Congratulations winner is ${value}`;
    msgContainer.classList.remove('hide');
    if(value === 'X'){
        playerXCount++;
        scoreX.innerText = playerXCount;
    }
    else{
        playerOCount++;
        scoreO.innerText = playerOCount;
        
    }
    disablegame()
}
boxes.forEach((box) =>{
    box.addEventListener('click',()=>{
        if(playerX){
            box.innerText = 'X';
            playerX = false;
        }
        else{
            box.innerText = "O";
            playerX = true;
        }
        box.disabled = true;
        checkdraw();
        checkWinner();
    })
});

const checkWinner = () => {
    for(pattern of winningPatterns){
        let posValue0 = boxes[pattern[0]].innerText;
        let posValue1 = boxes[pattern[1]].innerText;
        let posValue2 = boxes[pattern[2]].innerText;
    
        if((posValue0 !="") && (posValue1 !="") && (posValue2 !="")){
            if (posValue0 === posValue1 && posValue1 === posValue2){
                showWinner(posValue0);
            }
        }
    }
}

const checkdraw = () =>{
    let flag = 0;
    for(box of boxes){
        if(box.disabled == true){
            continue;
        }
        else{
            flag = 1;
            break;
        }
    }
    if(flag == 0){
        showdraw()
    }

}

const showdraw = () =>{
    message.innerText = 'Game is drawn';
    msgContainer.classList.remove('hide')
}

resetbtn.addEventListener('click',resetgame);
newBtn.addEventListener('click',resetgame);


