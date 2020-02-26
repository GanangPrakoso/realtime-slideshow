require('dotenv').config()
const express = require('express')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
const cors = require('cors')

const images = [
   `https://pro2-bar-s3-cdn-cf6.myportfolio.com/ff6266451e26f8cedfd1c74770fd1212/7fb58b7017535dd5959c97f6_rw_1200.jpg?h=8cad4186c024b6bd4555a223dcda15e3`,
   `https://asialive365.com/wp-content/uploads/2018/08/live-review-mac-demarco-hyh.jpg`,
   `http://www.vancouversun.com/cms/binary/11474995.jpg`,
   `https://static.wixstatic.com/media/3cb5ef_3bd78c9aaaa9442ba433c62efef657dc~mv2.jpg`
]

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', function (req, res) {
   res.send(images);
});

io.on('connection', function (socket) {
   socket.emit('news', (`halo socketssss`));
   console.log(`client connected`);
   
   socket.on('slides', function (command, index) {
      if (command == 'prev') {
         if (index === 0) {
            index = 3
            io.emit(`updateIndex`, index)
         }
         else {
            index--
            // console.log(index);
            io.emit('updateIndex', index)
         }
      }
      else if (command == 'next') {
         if (index === 3) {
            index = 0
            io.emit(`updateIndex`, index)
         }
         else {
            index++
            io.emit('updateIndex', index)
         }
      }
   });
})

server.listen(process.env.PORT, () => console.log(`Terkoneksi nih bos di port ${process.env.PORT}`));
