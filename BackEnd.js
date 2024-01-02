

// On Ready
$(()=>{
    console.log("Hello God");
    console.log("SAAAA")
    
});

function CreateEvent(Name,Desc,Time,Org){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'1',
            userID:'2',
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

function AcceptUserToEvent(uID,eID){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'4',
            userID:uID,
            eventID:eID
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
        }
    });
}

function Login(uName,pass){
    $.ajax({
        url:"http://localhost:430/MetroEvents/UserHandler.php",
        type:"POST",
        data:{
            type:'1',
            username:uName,
            password:pass
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
    
}

function CreateUser(uName,pass){
    $.ajax({
        url:"http://localhost:430/MetroEvents/UserHandler.php",
        type:"POST",
        data:{
            type:'2',
            username:uName,
            password:pass
        },
        success:(resp)=>{
            console.log(resp);
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

