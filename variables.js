/*
Hoisting - It is a process in which the data declarations and function declarations are moved to the top of the scope of program,
irrespective of where it was declared in that scope. It doesnt mean it will move the initialiation to the top but only the
declaration. For Example, in below code

console.log(a);
var a = 100;

For the above code, the declration will change in the back end as

var a;
console.log(a);
a = 100;

Since a is having undefined when controls comes to line 2, it will print undefined
*/

/*
var - var key word is used, if we want to declare a variable and use it across the entire function scope and not only within
that block. If we are trying to declare a vairable with var, then the contents of that vairable can be changed within 
that function scope

let - let key word is used, if we want to declare a variable whose scope is only within that block. It eliminates 
a lot of error, when are trying to code something, that should be visible only inside that block and not outside.

const - const key word is used, if we want to declare immutable variables whose scope is also within a block. Variables declared using const cannot be
re-initiazed, but the the value. It doesnt mean, we cannot change the existing value, only that it cannot be completely
re-initialized again
*/

//Case-1:var
function usingVar(){
    var isTrue = true;
    console.log("Case 1:var")
    if(isTrue){
        var myVar = 100;
        console.log(myVar);
    }

    myVar = 200;
    console.log(myVar);
}

usingVar();

//Case2:let
function usingLet(n){
    let myLet = n;

    console.log("Case 2:let")
    if(myLet%10 == 0){
        let myLetSquare = myLet * myLet;
        console.log(myLetSqaure);
    }
    else{
        let myLetCube = myLet * myLet * myLet;
        console.log(myLetCube)
    }
}

usingLet(5);

//Case 3:const
function usingConst(){
    const myConst = {
        name:"Vignesh",
        age:24,
        gender:"Male",
    }

    const name = "Vignesh";

    console.log("Case 3:const")
    if(myConst.name == name){
        console.log("Name matches");
        const age = 24;
        if(myConst.age === age){
            console.log("Age Matches")
            myConst.age += 1;
            console.log("New age = " + myConst.age);
        }else{
            console.log("Age doesnt match");
        }
    }
}

usingConst();