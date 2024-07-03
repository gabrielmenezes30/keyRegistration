import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {engine} from 'express-handlebars'
import keys from './routes/keys.js'
import user from './routes/user.js'
import mongoose from 'mongoose'
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")))

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/cadastrochaves').then(()=>{
    console.log('MongoDB conectado com sucesso')
}).catch((err)=>{
    console.log('houve um erro ao tentar se conectar ao MongoDB ', err)
})


app.engine('handlebars', engine({ 
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('view engine', 'handlebars')

app.use('/chaves', keys)
app.use('/usuario', user)

app.listen(3000, () =>{
    console.log('rodou')
})