let table = document.getElementById("main");
const variable = ['X','O'];
const color = ['red','black'];
let game,length,curr;

//Function to check if values are equal
const equal = (a,b,c) => {
    if(game[a] === '' || game[b] === '' || game[c] === '')return false;
    if(game[a] === game[b] && game[b] === game[c] && game[a] === game[c])return true;
    return false;
}


//Function to initialize the game
const initial = () =>{
    game = ['','','','','','','','',''];
    length = 0;
    curr = 0;

    for(let i = 1 ; i < 10 ; i++ ){
        document.getElementById(i).innerText='';
    }
};


//Function to check for winner
const win = () =>{
    if (equal(0,1,2) || equal(3,4,5)||equal(6,7,8) || equal(0,3,6)
    || equal(1,4,7) || equal(2,5,8) || equal(0,4,8) || equal(2,4,6))
    {
        alert(`${variable[curr]} has won!`);
        
        initial();
    }
    else if(length == 9){
        alert(`Cats Game!`);
        initial();
    }
    else{
        curr ^= 1;
    }
};



//Event listener for click
table.addEventListener("click",(event) =>{
   const id = event.path[0].id;
   const player = document.getElementById(id);
    if(!player.innerText){
        player.innerText = variable[curr]
        player.style.color = color[curr];
        game[id - 1] = variable[curr];
        length += 1;

        //Checking winning logic
        setTimeout(win,200);

    }
});

initial();