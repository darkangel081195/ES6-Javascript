let div = ["sign","nav","sign-up","log-in","account","list","dash"]
let error =["signerror","logerror","updateerror","headererror","itemerror"]
let curr_user = {}
let users_list = []
let newList = false;
let curr_list = {};

//Hiding all div and showing only passed div
function currentPage(curr){

    //Hide all the sections
    for(const value of div){
        document.getElementById(value).classList.add("hide")
    }

    //Show the section which is passed in the function
    for(const value of curr){
        document.getElementById(value).classList.remove("hide");
    }
}

//Hiding all error
function hideError(){

    //Hide all the sections
    for(const value of error){
        document.getElementById(value).classList.add("hide")
    }
}

//Sending error message
function message(value,id){
    const text = document.getElementById(id);
    text.classList.remove("hide");
    text.innerText = value;
}

//Loading the dashboard
function dashboard(){
    //Checking if the user has any list already saved
    //If yes, then populate the list

    if(curr_user.list.length > 0){
        let dash = document.getElementById("to-do-list");
        dash.innerHTML = "";
        //Append each list as a LI element inside UL
        for(const value of curr_user.list){
            const child = document.createElement("li");
            const link = document.createElement("a");
            link.innerText = value.listName;
            link.setAttribute("href","#");
            link.classList.add("to-do-list");
            child.appendChild(link);

            //append to UL
            dash.appendChild(child);
        }
    }
}

//Loading the list page
function list(){
    hideError();
    document.getElementById("headerform").reset();
    document.getElementById("itemform").reset();
    let listName = ""
    let listItem = []

    if(newList){
        listName = "New List";
    }
    else{
        listName = curr_list.listName;
        listItem = curr_list.items;
    }

    //Fill the header information
    document.querySelectorAll("#list-header h3")[0].innerText = listName;

    //Fill the items
    let ul = document.getElementById("to-do-items");
    ul.innerHTML = "";
    for(const value of listItem){
        let li = document.createElement("li");
        li.innerText = value.text;
        if(value.completed){
            li.classList.add("completed");
        }

        ul.appendChild(li);
    }
}

//Filling the account information page
function account(){
    document.getElementById("updatefirst").value = curr_user.first;
    document.getElementById("updatelast").value = curr_user.last;
    document.getElementById("updateemail").value = curr_user.email;
}

//Getting all the current users for the app from local storage
document.addEventListener('DOMContentLoaded', (event) => {
    users_list = JSON.parse(localStorage.getItem("todolist"))||[];
});



//Signup button action
document.getElementById("signup").addEventListener("click",(event)=>{
    event.preventDefault();
    currentPage(['sign-up',"sign"])
    hideError();
    document.getElementById("signform").reset();
});


//Login button action
document.getElementById("login").addEventListener("click",(event)=>{
    event.preventDefault();

    //If user has already logged in, then load the dashboard
    if(curr_user.hasOwnProperty("email")){
        hideError();
        currentPage(["nav","dash"]);
        document.getElementById("welcome").innerText = `${curr_user.first} ${curr_user.last}`;
        dashboard();
    }
    else{
        currentPage(['log-in',"sign"])
        hideError();
        document.getElementById("logform").reset();
    }
});


//Submiting signup form
document.getElementById("signform").addEventListener("submit",(event)=>{
    event.preventDefault();
    hideError();

    //Fetching all values
    const first = document.getElementById("signfirst").value;
    const last = document.getElementById("signlast").value;
    const email = document.getElementById("signemail").value;
    const pass = document.getElementById("signpassword").value;
    const terms = document.getElementById("signterms").checked;

    //Checking if all the values are present
    if(first ==="" || last === "" || email === "" || pass===""){
        message("Please fill all the above fields","signerror");
        return;
        
    }
    else if(!terms){
        message("Please accept our terms of use","signerror");
        return;
        
    }

    //Check if email id is already registered
    for(const value of users_list){
        if(value.email === email){
            message("The email is already registered","signerror");
            return;
        }
    }


    //Creating the new user
    let user = {
        first:first,
        last:last,
        email:email,
        password:pass,
        list:[]
    }
    curr_user = user;

    //Adding to local storage
    users_list.push(curr_user);
    localStorage.setItem("todolist",JSON.stringify(users_list));

    //Loading the dashboard
    hideError();
    currentPage(["nav","dash"]);
    document.getElementById("welcome").innerText = `${curr_user.first} ${curr_user.last}`;
    dashboard();


});

//Submiting the login form
document.getElementById("logform").addEventListener("submit",(event)=>{
    event.preventDefault();
    hideError();

    const email = document.getElementById("logemail").value;
    const pass = document.getElementById("logpassword").value;
    let flag = false;

    //Check if email id and password match
    for(const value of users_list){
        if(value.email === email && value.password === pass){
            curr_user = value;
            flag = true;
            break;
        }
    }

    if(flag){
        hideError();
        currentPage(["nav","dash"]);
        document.getElementById("welcome").innerText = `${curr_user.first} ${curr_user.last}`;
        dashboard();
    }
    else{
        message("The email id or password is incorrect","logerror");
        return;
    }
    
});


//Creating a new list button
document.getElementById("new-list").addEventListener("click",(event)=>{
    event.preventDefault();
    newList = true;
    currentPage(["nav","list"]);
    curr_list = {
        listName: "",
        items:[]
    }
    list();    
});

//Link list from Dashboard to list page
document.getElementById("to-do-list").addEventListener("click",(event)=>{
    event.preventDefault();
    let li = event.target.closest("li");
    let nodes = Array.from(li.closest('ul').children);
    const index = nodes.indexOf(li);
    curr_list = curr_user.list[index];
    newList = false;
    currentPage(["nav","list"]);
    list();
});


document.getElementById("headerform").addEventListener("submit",(event)=>{
    event.preventDefault();
    hideError();
    const headerName = document.getElementById("headername");
    let flag = false;

    //Check if the input element has value
    if(headerName.value === ""){
        message("Please enter a name in the input field","headererror");
        return;
    }

    //Check if name is unique
    for(const value of curr_user.list){
        if(value.listName === headerName.value){
            flag = true;
            break;
        }
    }

    if(flag){
        message("Please enter a different name","headererror");
        return;
    }
    else{
        //If control comes here, then change the name
        curr_user.list.push(curr_list);
        
        curr_list.listName = headerName.value;
    
        //Update the local storage
        localStorage.setItem("todolist",JSON.stringify(users_list));
    
        newList = false;
        list();

    }
});

document.getElementById("itemform").addEventListener("submit",(event)=>{
    event.preventDefault();
    hideError();
    const item = document.getElementById("itemname").value;

    //Check if new list is true, if yes then throw error
    if(newList){
        message("Please give a custom name to the list before adding items","itemerror")
        return;
    }

    //Check if value is present
    if(item === ""){
        message("Please enter a new List item before clicking the button","itemerror");
        return;
    }

    //If not add the item to the list
    let newItem = {
        text : item,
        completed: false
    }

    curr_list.items.push(newItem);
    
    //Adding the items to the list
    let li = document.createElement("li");
    li.innerText = item;

    document.getElementById("to-do-items").appendChild(li);

    //Clearing the form
    document.getElementById("itemform").reset();

    //Update the local storage
    localStorage.setItem("todolist",JSON.stringify(users_list));
});


//Toggling between completing the task for line items
document.getElementById("to-do-items").addEventListener("click",(event)=>{
    event.preventDefault();
    let li = event.target.closest("li");
    let nodes = Array.from(li.closest('ul').children);
    const index = nodes.indexOf(li);

    nodes[index].classList.toggle("completed");
    curr_list.items[index].completed = !curr_list.items[index].completed;

    //Save it to local database
    localStorage.setItem("todolist",JSON.stringify(users_list));
});



//Dashboard button
document.getElementById("dashboard").addEventListener("click",(event)=>{
    event.preventDefault();
    currentPage(["nav","dash"]);
    curr_list = {};
    newList = false;
    dashboard();
});


//Account settings button
document.getElementById("account-settings").addEventListener("click",(event)=>{
    event.preventDefault();
    hideError();
    currentPage(["nav","account"]);
    account();
});

//Update button
document.getElementById("updateform").addEventListener("submit",(event)=>{
    event.preventDefault();
    hideError();

    //Fetching all values
    const first = document.getElementById("updatefirst").value;
    const last = document.getElementById("updatelast").value;
    const email = document.getElementById("updateemail").value;
    const pass = document.getElementById("updatepassword").value;

    //Checking if all the values are present
    if(first ==="" || last === "" || email === ""){
        message("Please fill first name,last name and email","updateerror");
        return;
        
    }

    //Check if email id is already registered
    if(curr_user.email !== email){
        for(const value of users_list){
            if(value.email === email){
                message("The email is already registered","updateerror");
                return;
            }
        }
    }


    //Updating current user
    curr_user.first = first;
    curr_user.last = last;
    curr_user.email = email;
    if(pass !== "")curr_user.password = pass;

    //Adding to local storage
    localStorage.setItem("todolist",JSON.stringify(users_list));

    //Success message
    hideError();
    alert("Update successfull");
    document.getElementById("welcome").innerText = `${curr_user.first} ${curr_user.last}`;

});

document.getElementById("logout").addEventListener("click",(event)=>{
    event.preventDefault();
    curr_user = {};
    newList = false;
    curr_list = {};
    currentPage(["sign"]);
    document.getElementById("welcome").innerText = "";

});
