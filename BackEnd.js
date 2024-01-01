

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