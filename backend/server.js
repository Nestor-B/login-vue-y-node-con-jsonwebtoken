// Document js
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.set('port', process.env.PORT || 4000)
app.use(express.urlencoded({extended: true}))

app.post('/login', (req, res) => {
    const user = {
        username: 'benjamin',
        password: '12345'
    }
    const token = jwt.sign( {user}, 'keysecret' )
    res.json({
        token, 
        user
    })
})

function verificarToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if( token ){
        jwt.verify(token,'keysecret', (err, data) => {
            if(err){
                return res.status(500).json({error: err})
            }
            res.status(200).json({
                token, 
                user: {...data.user, active: true}
            });
            next()
        } );
    }
}
app.post('/user', verificarToken, (req, res) => {
    res.status(200)
})

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`)
})