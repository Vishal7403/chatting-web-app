let socket=io()
    $('#loginBox').show()
    $('#chatBox').hide()
    
$('#btnstart').click(()=>{
    socket.emit('login',{
        username:$('#inpUsername').val(),
        password:$('#inpPass').val()
    })
})
socket.on('login_failed',()=>{
    window.alert('username or password wrong')
})
socket.on('logged_in',(data)=>{
    $('#username').append($('<h1>').text(`hello ${data.username}`))
    $('#loginBox').hide()
    $('#chatBox').show()
})
$('#sendMsg').click(()=>{
    socket.emit('msg_send',{
        to:$('#inpToUser').val(),
        msg:$('#inpMsg').val()
    })
    $('#inpToUser').val('')
    $('#inpMsg').val('')
})
socket.on('msg_received',(data)=>{
    $('#ullist').append($('<li>').text(
        `${data.from}:${data.msg}`
    ))
    

})
