let min=1,
    max=10,
    winningNum=getRandomNum(min,max),
    guessesLeft=3;

const game = document.querySelector('#game'),
    minNum= document.querySelector('.min-num'),
    maxNum= document.querySelector('.max-num'),
    guessBtn= document.querySelector('#guess-btn'),
    guessInput= document.querySelector('#guess-input'),
    message= document.querySelector('.message');


    minNum.textContent=min;
    maxNum.textContent=max;
    //play again event listner
    game.addEventListener('mousedown',function(e){
        if(e.target.className ==='play-again'){
            window.location.reload();
        }

    });
    //Listen for Guess
    guessBtn.addEventListener('click',function(){
        let guess = parseInt(guessInput.value);
        if(isNaN(guess)|| guess< min || guess > max){
            setMessage(`Please enter a number between ${min} and ${max}`,'red');
        }
        if(guess === winningNum){
            gameOver(true,`${winningNum} is correct, YOU WIN!`)
            
        }else{
            //Wrong number
            guessesLeft=guessesLeft-1;
            if(guessesLeft===0){
                gameOver(false,`Game Over, you lost.The correct number is ${winningNum}`)
                
            }else{
                //Game continues- answer wrong
                guessInput.style.borderColor='red';
                guessInput.value='';
                setMessage(`Guess is not correct.${guessesLeft} guesses left`,'red');
            }
        }
    });
    function gameOver(won,msg){
        let color;
        won === true? color='green':'red';
        //Change Border Color
        guessInput.style.borderColor=color;
        //Disable Input
        guessInput.disabled=true;
        //set Text color
        message.style.color=color;
        //Set Message
        setMessage(msg);  
        //Play again
        guessBtn.value='Play Again';
        guessBtn.className +='play-again';
    }
    function setMessage(msg,color){
        message.style.color=color;
        message.textContent = msg;
    }
    //Get Winning Number
    function getRandomNum(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);

    }