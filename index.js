import express from 'express'
import cors from 'cors'
import session from 'express-session'
import path from 'path'
import posts from './controller/posts.js' 
import users from './controller/users.js' 
import comments from './controller/comments.js' 

const app = express()

//CORS blokavimo nuėmimas 
app.use(cors())

//Duomenų priėmimui JSON formatu
app.use(express.json())

//Failu perdavimui is statinės direktorijos
app.use('/uploads', express.static('uploads'))

//React aplikacijos failu perdavimui is statines direktorijosq
app.use('/', express.static('public'))

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({extended: true}))

app.set('trust proxy', 1) 

app.use(session({
    secret: 'labai slapta fraze',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 6000000
    }
}))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

//Priskiriame posts kontrolerį
app.use('/api/posts/', posts)

//Priskiriame users kontrolerį
app.use('/api/users/', users)

//Priskiriame comments kontrolerį
app.use('/api/comments/', comments)

//Paleidžiame serverį
app.listen(PROCESS.ENV.PORT || 3000)