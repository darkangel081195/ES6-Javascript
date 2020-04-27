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

        //Append each list as a LI element inside UL using template literal
        let content = `${curr_user.list.map((value) => `<li><a href="#">${value.listName}</a></li>`).join("")}`;
        dash.innerHTML = content;
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

    //Fill the items using template literal
    let ul = document.getElementById("to-do-items");
    ul.innerHTML = "";
    let content = `${listItem.map((value) => `<li class="${(value.completed) ? "completed" : ""}">${value.text}</li>`).join("")}`;
    ul.innerHTML = content;
}

//Filling the account information page
function account(){
    document.getElementById("updatefirst").value = curr_user.first;
    document.getElementById("updatelast").value = curr_user.last;
    document.getElementById("updateemail").value = curr_user.email;
}

function fillPage(){
    let content = `<h1>To-Do List</h1>
    <h3>One place for all your activities</h3>

    <div id="sign">
        <a href="#" id="signup" class="btn">Sign Up</a>
        <a href="#" id="login" class="btn">Log In</a>
    </div>

    <div id="nav" class="hide">
        <p id="welcome"></p>
        <a href="#" class="btn btn-acc" id = "account-settings">Account Settings</a>
        <a href="#" class="btn btn-dash" id = "dashboard">Dashboard</a>
        <a href="#" class="btn btn-log" id = "logout">Logout</a>
        <hr>
    </div>

    <div id="sign-up" class="hide">
        <h3>Sign up</h3>

        <form id ="signform"action="#">
            <p>
                <label for="signfirst">First Name:</label>
                <input type="text" name="first-name" id="signfirst">
            </p>
            <p>
                <label for="signlast">Last Name:</label>
                <input type="text" name="last-name" id="signlast">
            </p>
            <p>
                <label for="signemail">Email:</label>
                <input type="email" name="email" id="signemail">
            </p>
            <p>
                <label for="signpassword">Password:</label>
                <input type="password" name="password" id="signpassword">
            </p>
            <label for="signterms"></label>
            <input type="checkbox" name="terms" id="signterms">I agree to the Terms of Use

            <p id = "signerror"class="error">Error in the provided inputs</p>

            <button type="submit" class = "btn btn-sign" value="Sign Up">Sign Up</button>
        </form>
    </div>

    <div id="log-in" class="hide">
        <form id="logform"action="#">
            <p>
                <label for="logemail">Email:</label>
                <input type="email" name="email" id="logemail">
            </p>
            <p>
                <label for="logpassword">Password:</label>
                <input type="password" name="password" id="logpassword">
            </p>
            <p id="logerror"class="error">Error in the provided inputs</p>
            <button type="submit" class ="btn btn-sign"value="Log In">Log In</button>
        </form>
    </div>


    <div id="account" class="hide">
        <h3>Account information</h3>

        <form id="updateform"action="#">
            <p>
                <label for="updatefirst">First Name:</label>
                <input type="text" name="updatefirst" id="updatefirst">
            </p>
            <p>
                <label for="updatelast">Last Name:</label>
                <input type="text" name="last-name" id="updatelast">
            </p>
            <p>
                <label for="updateemail">Email:</label>
                <input type="email" name="email" id="updateemail">
            </p>
            <p>
                <label for="updatepassword">
                    Password:<small>(*Leaving password blank would not update the password)</small>
                </label>
                <input type="password" name="password" id="updatepassword">
            </p>
            <p id="updateerror"class="error">Error in the provided inputs</p>
            <button type="submit" class ="btn btn-sign"value="update account">Update</button>
        </form>
    </div>

    <div id="dash" class="hide">
        <h3>Dashboard</h3>
        <ul id="to-do-list">
        </ul>

        <a href="#" id="new-list"class="btn btn-dash">Create New to-do List</a>
    </div>

    <div id="list" class="hide">
        <div id="list-header">
            <h3>List Name</h3>
            
            <form action="#" id="headerform">
                <p>
                    <input type="text" id = "headername" placeholder="Enter new name of the list">
                </p>
                <p id="headererror"class=error>Error in the provided inputs</p>
                <button type="submit" class="btn btn-dash"value="rename list">Rename List</button>
            </form>
        </div>
        <div id="list-items">
            <h4>List Items</h4>
            <ul id="to-do-items">
            </ul>

            <form action="#" id="itemform">
                <p></p><input type="text" id ="itemname" placeholder="Enter new item">
                <p id="itemerror" class="error">Error in the provided inputs</p>
                <button type="submit" class="btn btn-dash"id="update-item"value="rename list">Add Item</button>
            </form>
        </div>
    </div>`;

    document.getElementsByClassName("box")[0].innerHTML = content;
}

//Getting all the current users for the app from local storage
fillPage();
users_list = JSON.parse(localStorage.getItem("todolist"))||[];



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
