const http=require('http')
const express=require('express')
const app=express()
const socketio=require('socket.io')
const server=http.createServer(app)
const io=socketio(server)
let Users={}
let socketMap={}
io.on('connection',(socket)=>{
    //console.log('connected with socket id=',socket.id)
        function login(s,d)
        {
            s.join(d.username)
            s.emit('logged_in',d)
            socketMap[s.id]=d.username

        }
        socket.on('login',(data)=>{
            if(Users[data.username])
            {
                if(Users[data.username]==data.password)
                {
                    login(socket,data)
                }
                else{
                    socket.emit('login_failed')
                }
            }
            else{
                Users[data.username]=data.password
                login(socket,data)
            }
            
        })
        socket.on('msg_send',(data)=>{
            data.from=socketMap[socket.id]
            if(data.to)
            {
                io.to(data.to).emit('msg_received',data)
            }
            else{
                socket.broadcast.emit('msg_received',data)
            }
        })
    })
    

app.use('/',express.static(__dirname+'/public'))
server.listen(5566,()=>{
    console.log('server started at http://localhost:5566')
})
//socket.emit send the message to only itself whereas io.emit send messasge to all sockets
//socket.broadcast send message to other sockets except the sender socket