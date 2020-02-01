function main() {
    var socket = io();
    var button = document.getElementById("submit");
    var input = document.getElementById("message");

    function click() {
        if (input.value.trim() != '') {
            socket.emit("send_message", input.value);
            input.value = "";
        }
    }
    socket.on("got_msg", function (data) {
        var new_p = document.createElement("p");
        var div = document.getElementById("chat");
        new_p.innerText = data;
        div.appendChild(new_p);
    })

    button.onclick = click;
    

}

window.onload = main;