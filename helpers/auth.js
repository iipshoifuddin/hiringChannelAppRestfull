require('dotenv/config') // getting ENV value
const express = require('express')
const JWT = require('jsonwebtoken')
const Route = express.Router()

// login and sign jwt
Route.post('/login', (req, res) => {
    // get email and password from req.body
    const { email, password } = req.body;
    // check login if email and password are match from DB
    // 1. check email
    // 2. check password match with email

    const userid = 1991293219 // example, do not copy, get from DB instead

    // signing JWT token
    const token = JWT.sign(
        // payload/data
        {
            email,
            userid
        },
        process.env.SECRET_KEY,
        // options
        {
            expiresIn: '1h'
        }
    )
    console.log(token)
    res.status(201).json({
        status: 201,
        message: 'Success login!',
        token,
        user: {
            email,
            userid
        }
    })
})

// check authentication of user and token
Route.get('/secret', (req, res) => {
    // get header
    const { authorization, email, userid } = req.headers
    // check header for required headers
    if(!authorization || !email || !userid) {
        return res.status(404).json({ 
            message: 'Unauthorized!'
        })
    }

    // split to get real token
    const token = authorization.split(" ")[1]

    // decode JWT and check for validity
    JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        // check for invalid token
        if(err && err.name === 'JsonWebTokenError'){
            return res.status(403).json({ 
                message: 'Invalid token!'
            })
        }
        
        // check for expired token
        if(err && err.name === 'TokenExpiredError') {
            return res.status(403).json({
                message: 'Token expired!'
            })
        }
        
        // check if token is registered with correct email and userid
        if(email !== decoded.email || parseInt(userid) !== decoded.userid) {
            return res.status(403).json({
                message: 'Token not valid for selected id/email',
                message2: 'hmmm, maling token lu yaa?!'
            })
        }

        // if valid then do next step

        res.json({ 
            msg: 'authorized'
        })
    })
})

module.exports = Route