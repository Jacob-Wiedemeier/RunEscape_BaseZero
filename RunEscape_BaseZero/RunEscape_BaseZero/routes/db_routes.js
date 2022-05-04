const express = require('express')
const router = express.Router()

const db = require('../db')

// hear ye, hear ye, cringe javascript ahead

const function_list = Object.keys(db)

function_list.forEach((function_name) => {

    router.get(`/${function_name}/:id1/:id2`, async (req, res) => {
        if(req.params.id1 && req.params.id2){
            const result = await db[function_name](req.params.id1, req.params.id2)
            res.json(result)
        } else{
            const result = await db[function_name]()
            res.json(result)
        }
    })

    router.get(`/${function_name}/:id`, async (req, res) => {
        if(req.params.id){
            const result = await db[function_name](req.params.id)
            res.json(result)
        } else{
            const result = await db[function_name]()
            res.json(result)
        }
    })


    router.post(`/${function_name}/:id`, async (req, res) => {
        if(req.body && req.params.id){
            const result = await db[function_name](req.params.id, req.body)
            res.json(result)
        }
        else if(req.body){
            const result = await db[function_name](req.body)
            res.json(result)
        }
    })
})

module.exports = router