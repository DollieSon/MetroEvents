let events = {}
let users = {}
let currentUser = {
    id:-1,
    username: "",
    level: "",
    posted_Events: [],
    joined_Events: [],
    accepted_Events: []
}
// On Ready
$(document).ready(()=>{
    console.log(`Starting..>`);
    LoadAllEvents();
})
function LoadAllEvents(){
    //console.log(events);
    UpdateAll();
    $('#AllEvents').remove();
    let eventList = '';
    for (eID in events) {
        title = CreateElem('p','EventTitle','',events[eID]['Name']);
        Org = CreateElem('p','Organizer','',events[eID]['Organizer']);
        Description = CreateElem('p','EventDisc','',events[eID]['Description']);
        Joinbtn = CreateElem('button','JoinEventBtn','','Join',`onclick='AddUserToEvent(${currentUser.id},${eID})'`);
        Deletebtn = '';
        if(currentUser.id == parseInt(events[eID]['Organizer'])){
            Deletebtn = CreateElem('button','DeleteEventBtn','','Delete',`onclick ='DeleteEvent(${currentUser.id},${eID})'`);
        }
        btns = CreateElem('div','','',Joinbtn+Deletebtn);
        eventList+= CreateElem('div',`e${eID}`,'EventBox',title+Org+Description+btns);
        //console.log(MyEvent);
    }
    let Display = CreateElem('div','AllEvents','EventCont',eventList);  
    $('#Mid').append(Display); 
}
function LoadLoginBox(type){   
    $(`.InputCont`).remove();
    uName = CreateElem('label','','','UserName',`for='usernameInput'`);
    uName += `<input type='text' id='usernameInput'>`;
    uName = CreateElem('div','userNameBox','',uName);
    pass = CreateElem('label','','','Password',`for='passwordInput'`);
    pass += `<input type='text' id='passwordInput'>`;
    pass = CreateElem('div','passwordBox','',pass);
    EnterBtn = CreateElem('button','LoginBtn','','Enter',`onclick='CheckLogin(${type})'`);
    let LoginContainer = CreateElem('div','LoginBox','InputCont',uName+pass+EnterBtn);
    console.log(LoginContainer);
    $('#UserInput').append(LoginContainer);
}

function LoadCreateEventBox(){
    $(`.InputCont`).remove();
    title = CreateElem('label','','','Event Name: ',`for='EventNameInput'`);
    title+= `<input type='text' id='EventNameInput'>`;
    title = CreateElem('div','EventTitleBox','',title);
    desc = CreateElem('label','','','Event Description: ',`for='EventDescInput'`);
    desc += `<input type='text' id='EventDescInput'>`;
    desc = CreateElem('div','EventDescBox','',desc);
    time = CreateElem('label','','','Time Description: ',`for='EventTimeInput'`);
    time += `<input type='text' id='EventTimeInput'>`;
    time = CreateElem('div','EventTimeBox','',time);
    EnterBtn = CreateElem('button','LoginBtn','','Enter',`onclick='ReadCreateEventBox()'`);
    let CreateEventCont = CreateElem('div','CreateEventBox','InputCont',title+desc+time+EnterBtn);
    $('#UserInput').append(CreateEventCont);
}

function CreateElem(Type,ID,Class,Text,Custom = ''){
    if(Custom == ''){
        return `<${Type} class='${Class}' id='${ID}'>${Text}</${Type}>`
    }
    return `<${Type} class='${Class}' id='${ID}' ${Custom}>${Text}</${Type}>`

}

function CheckLogin(type){
    uName = $('#usernameInput').val();
    pass = $('#passwordInput').val();
    console.log(uName);
    console.log(pass);
    Login(uName,pass,type);
}

function ReadCreateEventBox(){
    title= $('#EventNameInput').val();
    desc= $('#EventDescInput').val();
    time = $('#EventTimeInput').val();
    org = currentUser.id;
    CreateEvent(title,desc,time,org);
}

function UpdateAll(){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'0',
        },
        success:(resp)=>{
            events = JSON.parse(resp);
        },
        async:false
    });
    
    $.ajax({
        url:"http://localhost:430/MetroEvents/UserHandler.php",
        type:"POST",
        data:{
            type:'0',
        },
        success:(resp)=>{
            users = JSON.parse(resp);
        },
        async:false
    });
}

function CreateEvent(Name,Desc,Time,Org){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'1',
            userID:Org,
            data:JSON.stringify({
                "Name":Name,
                "Description":Desc,
                "Time":Time,
                "Organizer":Org
            })
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}

function ChangeEvent(Name,Desc,Time,Org){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'2',
            data:JSON.stringify({
                "Name":Name,
                "Description":Desc,
                "Time":Time,
                "Organizer":Org
            }),
            eventID:'2'
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}
function AddUserToEvent(uID,eID){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'3',
            userID:uID,
            eventID:eID
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}

function AcceptUserToEvent(uID,eID,eMode){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'4',
            userID:uID,
            eventID:eID,
            mode:eMode
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}


function DeleteEvent(cID,eID){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'5',
            creatorID:cID,
            eventID:eID
        },
        success:(resp)=>{
            console.log(resp);
            LoadAllEvents();
        }
    });
}

function Login(uName,pass,Type){
    $.ajax({
        url:"http://localhost:430/MetroEvents/UserHandler.php",
        type:"POST",
        data:{
            type:Type,
            username:uName,
            password:pass
        },
        success:(resp)=>{
            console.log(resp);
            if(resp != '-1'){
                UpdateAll();
                currentUser = users[resp];
                currentUser['id'] = resp;
                console.log(currentUser);
                $('#username').text(`Username:${currentUser.username}`);
                $('#userID').text(`ID:${currentUser.id}`);
                LoadAllEvents();
            }else{
                alert('Incorrect Log-in Credentials');
            }
        }
    });
    
}
function ChangeUserAuth(uID,AuthLevel){
    $.ajax({
        url:"http://localhost:430/MetroEvents/UserHandler.php",
        type:"POST",
        data:{
            type:'3',
            userID:uID,
            Level:AuthLevel
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}

function ChangeUserDetails(uID,uName,pass){
    $.ajax({
        url:"http://localhost:430/MetroEvents/UserHandler.php",
        type:"POST",
        data:{
            type:'4',
            userID:uID,
            username:uName,
            password:pass
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}


