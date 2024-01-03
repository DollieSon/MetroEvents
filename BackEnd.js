let events = {}
let users = {}
let currentUser = {
    id:-1,
    username: "",
    level: "-1",
    posted_Events: [],
    joined_Events: [],
    accepted_Events: []
}
// On Ready
$(document).ready(()=>{
    console.log(`Starting..>`);
    LoadAllEvents();
    Login('Dollison','password','1');
})

function fxl(){
    $('.lvl2').prop("disabled",true);
    $('.lvl2').text("Disabled");
}

function loadIndivEvent(eventID){
    title = CreateElem('p','EventTitle','',events[eventID]['Name']);
    Org = CreateElem('p','Organizer','',users[events[eventID]['Organizer']]['username']);
    Description = CreateElem('p','EventDisc','',events[eventID]['Description']);
    Joinbtn = CreateElem('button','JoinEventBtn','lvl1','Join',`onclick='AddUserToEvent(${currentUser.id},${eventID})'`);
    Deletebtn = '';
    if(currentUser.id == parseInt(events[eventID]['Organizer'])){
        Deletebtn = CreateElem('button','DeleteEventBtn','','Delete',`onclick ='DeleteEvent(${currentUser.id},${eventID})'`);
    }
    btns = CreateElem('div','','',Joinbtn+Deletebtn);
    eventBox = title+Org+Description+btns;
    return eventBox;
}

function LoadDetailedEvent(eventID){
    UpdateAll();
    console.log(eventID);
    $('.EventCont').remove();
    EventCont = CreateElem('div','DetailedEvent','EventCont',
        CreateElem('div','','',
            CreateElem('p','DeatailedName','',`${events[eventID]['Name']}`)+
            CreateElem('p','DeatailedName','',`ID:${eventID}`)
        )+
        CreateElem('p','DetailedUser','',`Organizer: ${users[events[eventID]['Organizer']][`username`]}`)+
        CreateElem('p','DetailedDescription','',`${events[eventID]['Description']}`)+
        CreateElem('p','DetailedTime','',`${events[eventID]['Time']}`)
    
    );

    $('#Mid').append(EventCont);
}

function LoadDetailedEventUsers(eventID){
    UpdateAll();
    PendingUsers =''
    userList = [...events[eventID]['Pending'], ...events[eventID]['Joining'],...events[eventID]['Declined']] 
    userList.sort((a,b)=>{
        return b-a;
    });
    for(uID of userList){
        concat = '';

        statuses = [events[eventID]['Pending'],events[eventID]['Joining'],events[eventID]['Declined']]
        for(stat in statuses){
            if(statuses[stat].includes(parseInt(uID))){
                concat = stat.toString();
                break;
            }
        }


        console.log("UID:"+uID);
        buttons = ''
        if(currentUser.id == events[eventID]['Organizer']){
            buttons = CreateElem('button','','AcceptUserBtn','Accept',`onclick='AcceptUserToEvent(${uID},${eventID},"1")'`);
            buttons += CreateElem('button','','DeclineUserBtn','Decline',`onclick='AcceptUserToEvent(${uID},${eventID},"0")'`);
        }
        element = CreateElem('div',`eC${uID}`,`elementCont Stat${concat}`,
            CreateElem('p','','',`${users[uID]['username']}`) + buttons
        );
        PendingUsers += element;
    }

    $('#EventUsers').remove();
    EventUsers = CreateElem('div','EventUsers','',
        CreateElem('div','AllUSers','',
            PendingUsers
        )
    );
    $('#DetailedEvent').append(EventUsers);

    for(elem of $('.AcceptUserBtn')){
        console.log($($(elem).parent()).prop('class').split(" ")[1]);
        if($($(elem).parent()).prop('class').split(" ")[1] == 'Stat1'){
            $(elem).prop('disabled',true);
        }else{
            $(elem).prop('disabled',false);     
        }
    }
    
    for(elem of $('.DeclineUserBtn')){
        console.log($($(elem).parent()).prop('class').split(" ")[1]);
        if($($(elem).parent()).prop('class').split(" ")[1] == 'Stat2'){
            $(elem).prop('disabled',true);
        }else{
            $(elem).prop('disabled',false);     
        }
    }
}



function LoadSetAuthBox(){
    function tempCreateRadio(id,name){
        res = `<input type="radio" name='radio${name}' id='N${name}I${id}' class='I:${id}'>`;
        return res + CreateElem('p','','',`${id}`);
    }
    UpdateAll();
    $('.EventCont').remove();
    Disp = '';
    for(uID in users){
        if((users[uID]['level'] == '4') || (uID == currentUser.id) || (currentUser.level == users[uID]['level'])){
            continue;
        }
        displayBox = '';
        uInfo = CreateElem('div','UserAuthInfo','',
        CreateElem('p','','',users[uID]['username'])+
        CreateElem('p','','',uID)
        );
        AuthRadio = CreateElem('div','UserAuthRadioBox','RadioBox',
        CreateElem('div',`aR${uID}`,'',tempCreateRadio(1,uID)) +
        CreateElem('div',`aR${uID}`,'',tempCreateRadio(2,uID)) + 
        `${
            (currentUser.level == '4') ? CreateElem('div',`aR${uID}`,'',tempCreateRadio(3,uID)):''
        }`
        );
        displayBox = CreateElem('div','UserAuthBox','',uInfo+AuthRadio);
        Disp+=displayBox;
    }
    Disp+=CreateElem('button' ,'','','Set Authentication Level',`onclick='ReadAuthBox()'`);
    let Display = CreateElem('div','AuthCont','EventCont',Disp);  
    $('#Mid').append(Display);
    //Turning On Auths
    for(uID in users){
        console.log(`#N${uID}I${users[uID]['level']}`);
        console.log(
            $(`#N${uID}I${users[uID]['level']}`).length
            );
        $(`#N${uID}I${users[uID]['level']}`).prop('checked',true);
    }
}


function ReadAuthBox(){
    for(uID in users){
        console.log(
            $(`#N${uID}I${users[uID]['level']}`).length
            );
        Auth = -1;
        if($(`#N${uID}I1`).prop('checked')){
            Auth = 1;
        }
        if($(`#N${uID}I2`).prop('checked')){
            Auth = 2;
        }
        if($(`#N${uID}I3`).prop('checked')){
            Auth = 3;
        }
        if(Auth != -1){
            ChangeUserAuth(uID,Auth);
        }
    }
}

function LoadAllEvents(classifier = ''){
    //console.log(events);
    UpdateAll();
    $('.EventCont').remove();
    let eventList = '';
    for (eID in events) {
        let eventBox = '';
        switch(classifier){
            case 'M'://Made
                if(currentUser.posted_Events.includes(parseInt(eID)) ){
                    eventBox = loadIndivEvent(eID);
                }
                break;
            case 'P'://Pending
                if(currentUser.joined_Events.includes(parseInt(eID))){
                    eventBox = loadIndivEvent(eID);
                }    
                break;    
            case 'A'://Accepted
                if(events[eID]['Joining'].includes(currentUser.id)){
                    eventBox = loadIndivEvent(eID);
                }
                break;
            case 'D'://Declined
                if(events[eID]['Declined'].includes(currentUser.id)){
                    eventBox = loadIndivEvent(eID);
                }    
                break;
            default:
                eventBox = loadIndivEvent(eID);
                break;
        }
        eventList+= CreateElem('div',`e${eID}`,'EventBox',eventBox);
        //console.log(MyEvent);
    }
    let Display = CreateElem('div','AllEvents','EventCont',eventList);  
    $('#Mid').append(Display); 
    console.log($('.EventCont').children());
    $('.EventCont').children().each((index,elem)=>{
        eventID = parseInt($(elem).prop('id').match(/\d+/)[0]);
        console.log(eventID);
        (function(eIDthis){
            $(elem).click(()=>{
                console.log(eIDthis);
                LoadDetailedEvent(eIDthis);            
                LoadDetailedEventUsers(eIDthis);
            });    
        })(eventID)
    });
    //checking UserID()
    $('#Right button').prop('disabled',true);
    $('.lvl1').prop('disabled',true);
    $('.lvl2').prop('disabled',true);
    $('.lvl3').prop('disabled',true);
    $('.lvl4').prop('disabled',true);
    switch (currentUser.level) {
        case '4':
            $('.lvl4').prop('disabled',false);
        case '3':
            $('.lvl3').prop('disabled',false);
        case '2':
            $('.lvl2').prop('disabled',false);
        case '1':
            $('.lvl1').prop('disabled',false);
            break;
        case '-1':
            $('#Right button').prop('disabled',true);
            $('.lvl1').prop('disabled',true);
            $('.lvl2').prop('disabled',true);
            $('.lvl3').prop('disabled',true);
            $('.lvl4').prop('disabled',true);
            break;
        default:
            break;
    }
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
    time += `<input type='time' id='EventTimeInput'>`;
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
    UpdateAll();
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
            LoadAllEvents()
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
            userID:parseInt(uID),
            eventID:parseInt(eID),
            mode:parseInt(eMode)
        },
        success:(resp)=>{
            console.log(resp);
            LoadDetailedEventUsers(eID);
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
        },
        async:false
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


