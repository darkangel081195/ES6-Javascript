//1.Socrates
console.log("1.Socrates")
let men = ['Socrates','Caesar','Marcus','Leon'];
const isMortal = true;
const name = 'Socrates'

if(isMortal){
    for(let i = 0 ; i < men.length ; i++){
        if(men[i] === name){
           console.log("Socrates is a man and he is mortal");
        }
        else{
            console.log(men[i] + " is not Socrates, but he is mortal");
        }
    }
}

console.log()
//Chocolate
let cake = "Vanilla";
console.log("2.Cake")

if(cake === "Chocolate" || cake === "Vanilla"){
    console.log("This cake is vanilla or chocolate");
    if(cake !== "Chocolate"){
        console.log("This cake is not cholocate");
        console.log("Thus, this cake is vanilla");
    }
    else{
        console.log("This cake is chocolate")
    }
}
else{
    console.log("This cake is neither vanilla or chocolate");
}