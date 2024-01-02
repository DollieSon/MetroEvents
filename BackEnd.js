

// On Ready
$(()=>{
    console.log("Hello God");
    console.log("SAAAA")
    
});

function CreateEvent(){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'1',
            data:JSON.stringify({
                "Name":'Namaste',
                "Description":"Party",
                "Time":"11:59",
                "Organizer":"0"
            })
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}

function ChangeEvent(){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'2',
            data:JSON.stringify({
                "Name":'King',
                "Description":"Partey",
                "Time":"11:59",
                "Organizer":"0"
            }),
            eventID:'2'
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}
function AddUserToEvent(){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'3',
            userID:'5',
            eventID:'2'
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}

function AcceptUserToEvent(){
    $.ajax({
        url:"http://localhost:430/MetroEvents/PostHandler.php",
        type:"POST",
        data:{
            type:'4',
            userID:'5',
            eventID:'2'
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
}

function Login(){
    $.ajax({
        url:"http://localhost:430/MetroEvents/UserHandler.php",
        type:"POST",
        data:{
            type:'1',
            username:'Dollison',
            password:'password'
        },
        success:(resp)=>{
            console.log(resp);
        }
    });
    
}

