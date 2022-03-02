const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')

// DataBase
require('./database/mongoDB')

// Routes
const EventRoutes = require('./routes/events')

class Server{
    constructor(){
        this.app = express()
    }
    Middlewares(){
        this.app.set('port',5000)
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use(cookieParser())
    }

    Multer(){
        const storage = multer.diskStorage({
            destination: path.join(__dirname, 'public/files'),
            filename: (req, file, cb) => {
                cb(null, new Date().getTime() + path.extname(file.originalname));
            }
        });
        this.app.use(multer({
            storage,
            fileFilter(req, file, cb) {
                cb(null, true);
            },
        }).array("files"))
    }

    Routes(){
        this.app.use('/client', require('./routes/client'))
        this.app.use('/products', require('./routes/product'))
        this.app.use('/colors', require('./routes/color'))
        this.app.use('/events', require('./routes/events'))
        this.app.use('/shipments', require('./routes/shipment'))
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    Start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('[+] Servidor en linea en http://localhost:'+this.app.get('port'))
        })
    }

    get init(){
        this.Middlewares()
        this.Multer()
        this.Routes()
        this.Start()
    }
}

const server = new Server()
server.init

module.exports=server