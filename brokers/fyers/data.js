const express = require('express')
const router = express.Router()
const fyers = require('fyers-api-v2')
const Credentials = require('../../../backtrader/brokers/fyers/credentials.json')

fyers.setAppId(Credentials.appID)
fyers.setRedirectUrl(Credentials.url)
fyers.setAccessToken(Credentials.token)

function subscribe(script){
    const reqBody = {
        symbol:script,        
        dataType:'symbolUpdate'
        
        }
        fyers.fyers_connect(reqBody,function(data){
            console.log(data)
        })
}

function unsubscribe(scripts){
    const reqBody = {
        symbol:scripts,        
        dataType:'symbolUpdate'        
        }       
        fyers.fyers_unsuscribe(reqBody)
}

router.post('/subscribe', (req,res) => {
    subscribe(req.body.script)
    res.status(200).send(`Subscribed to ${req.body.script}`)
})

router.post('/unsubscribe', (req,res) => {
    unsubscribe(req.body.script)
    res.status(200).send(`Unsubscribed to ${req.body.script}`)
})

module.exports = router