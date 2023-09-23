var jsonresponse;
var main=document.getElementById("main");

//first time will read data from json
function getData(){
    console.log("get data running");
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
            //console.log(JSON.parse(this.responseText));
            storeData(JSON.parse(this.responseText));
        }
    };

    xhttp.open("GET","userjsondata.json",false);
    xhttp.send();
}
function storeData(data){
    jsonresponse=data;
    console.log(jsonresponse);
    showData(jsonresponse);
}
getData();



//to show user on the webpage according to their json details
function showData(data){
    main.innerHTML="";
    for(var i=0;i<data.length;i++)      //loop for every user
    {
        var ord="<div class='user'>";
        ord+="<div class='photo'>";
        var extclass="cl"+data[i].presence;     //add class to add border color accordingly
        ord+=`<img src='${data[i].profilePicture}' class='image ${extclass}'>`;
        ord+="</div>";
        ord+=`<div class='about'><span class='name'>${data[i].name}</span><br>`;
        ord+=`<span class='status'>${data[i].statusMessage}</span></div></div>`;
        main.innerHTML+=ord;
    }
}

//to update present status of the user
function updatePresence(userDetails){
    var found=false;
    for(var i=0;i<jsonresponse.length;i++)
    {
        if(jsonresponse[i].userId==userDetails.userId)
        {
            found=true;
            jsonresponse[i].presence=userDetails.presence;
            break;
        }
    }
    if(found==false)
    {
        alert("UserId not found please give correct userid");
    }
    else{
        showData(jsonresponse);
    }
}

// var ud={
//     userId:"USR00001",
//     presence:4
// };
// updatePresence(ud);

//to update statusMessage
function updateStatusMessage(userDetails){
    var foundstatus=false;
    for(var i=0;i<jsonresponse.length;i++)
    {
        if(jsonresponse[i].userId==userDetails.userId)
        {
            foundstatus=true;
            jsonresponse[i].statusMessage=userDetails.statusMessage;
            break;
        }
    }
    if(foundstatus==false)
    {
        alert("UserId not found please give correct userid");
    }
    else{
        showData(jsonresponse);
    }
}

// updateStatusMessage({
//     userId:"USR00004",
//     statusMessage:"i am here and i will conquer"
// })

//to add a particular user
function addUser(userDetails){
    var foundUser=false;
    for(var i=0;i<jsonresponse.length;i++)
    {
        if(jsonresponse[i].userId==userDetails.userId)
        {
            foundUser=true;
            break;
        }
    }
    if(foundUser==true)
    {
        alert(`User with Given userId: ${userDetails.userId} is already present please give different userId`);
    }
    else{
        jsonresponse.unshift(userDetails);
        showData(jsonresponse);
    }
}

// var usr={
// "userId":"USR000020",
// "name": "Sidharth Surya",
// "profilePicture":
// "https://www.w3schools.com/w3images/avatar6.png",
// "statusMessage": "Procrastinator",
// "presence": 1
// }
// addUser(usr);

//to delete a particular user
function deleteUser(userDetails){
    var foundUserToDelete=false;
    var ind=-1;
    for(var i=0;i<jsonresponse.length;i++)
    {
        if(jsonresponse[i].userId==userDetails.userId)
        {
            foundUserToDelete=true;
            ind=i;
            break;
        }
    }
    if(foundUserToDelete==false)
    {
        alert(`User with Given userId: ${userDetails.userId} is not present please give different userId`);
    }
    else{
        jsonresponse.splice(ind,1);
        showData(jsonresponse);
    }
}

// deleteUser({
//     userId:"USR00004"
// })