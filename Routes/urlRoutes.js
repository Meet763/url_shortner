const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const URL = require('../models/url');

router.post('/', async (req, res) => {
    try{
        const body = req.body;
        if(!body.url) return res.status(400).json({ error: "url is required"})
        const shortID = uuidv4().slice(0, 8);
        const newUrl = new URL({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [] 
        }); 
        
        await newUrl.save();
        res.status(200).json({id: shortID});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router

