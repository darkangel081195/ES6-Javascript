//1.Socrates
console.log("1.Socrates")
let men = ['Socrates','Caesar','Marcus','Leon'];

function isMortal(name){

    if(typeof name !== 'string'){
        return('Invalid Input')
    }
    else{
        if(men.indexOf(name) !== -1){
            return('Given name '+name+' is mortal')
        }
        else{
            return('Given name '+name+' is not mortal')
        }
    }
}

console.log(isMortal('Caesar'));
console.log(isMortal('Socrates'));
console.log(isMortal('Adam'));
console.log(isMortal(123));


console.log()
//Chocolate
console.log("2.Cake")

function cake(cakeList,isChocolate){
    if(isChocolate){
        return('Chocolate')
    }
    else{
        return('Vanilla');
    }
}

arr = ['chocolate','vanilla'];
console.log(cake(arr,true));