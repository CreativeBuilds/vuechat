
$(function(){
    let username = prompt("What do you want to be called?", "");
    if(!username){
        username = "John";
    }
    if(username.trim() === ""){
        username = "John";
    }
    var socket = io();
    var app = new Vue({
        el:"#wrapper",
        data:{
            typing: "",
            messages: [
                {text:"This is a test!"}
            ]
        },
        methods: {
            sendMessage: function(){
                this.messages.push({text:this.typing,username:username});
                let currentMessage = this.typing;
                socket.emit("sendMessage", {text:currentMessage,username:username});
                this.typing = "";
            }
        }
    })

    socket.on('newMessage', function(message){
        console.log("got message", message);
        app.messages.push(message);
    })
})
var test = function(){
    console.log("User hit enter!");
}
