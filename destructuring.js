/* Question - Difference between Array and Object Destructuring?

The difference between array and object destructuring is array destructuring uses [](square bracket)
while object destructuring uses {}(curly braces). Both has it own advantages and disadvantages depending on
the use case. 

In array destructuring the order of the variables is important. If we want to destructure 
array then we need to know the values present in each index, so the we can seperate the values.
But in object we do not want to know the position of values as we will destructure it based on the id/name of
the property

The usage of either array or objects clearly depends on the use case and type of data structure required.
We can use array destructuring when we have a large array and we need only certain elements of it or we
can directly place them during variables declaration phase itself. Object destructuring is useful when
we require only certain attributes of a object for processing
*/

//Array destructuring
const colors = ["white","red","black","blue"];

const [color1,color2,...color3] = colors;
console.log(color1,color2,color3);

const [color4,color5,,color6] = colors;
console.log(color4,color5,color6);



//Object Destructing
const user = {
    firstName : "Mark",
    LastName  : "Smith",
    contact   : "5894038104",
    occupation : "Engineer"
}

const{firstName,LastName,contact} = user;
console.log(firstName,LastName,contact);

const{firstName:first,LastName:last,occupation:work} = user;
console.log(first,last,work);

function printName({firstName:name}){
    console.log(`Hi, this is ${name}`);
}
printName(user);