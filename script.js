let messages;
let size = 0;

function sendMsg(){
    let msg = document.getElementById('msg').value;
    let name = document.getElementById('name').value;
    fetch('/messageSent',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'name':name,
            'message':msg
        })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)));
    //deleting message
    document.getElementById('msg').value = '';
}

setInterval(() => {
        fetch('/update')
        .then(response => response.json())
        .then(data => {
            msgBox = document.getElementById('msgBox');
            msgBox.innerHTML = '';
            let newInner = '';
            messages = data.messages;
                messages.forEach(msg => {
                    newInner = newInner + '<br>' + msg;
                });
            console.log(newInner);
                msgBox.innerHTML = newInner;
        })
},1000);