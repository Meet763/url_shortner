const express = require('express')
const urlRoutes = require("./Routes/urlRoutes")
require('dotenv').config();
const app = express();
const db = require("./db")
const URL = require("./models/url")
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/url', urlRoutes);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        },
        { new: true } 
    );

     // If entry doesn't exist, return a 404 error
     if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    
    res.redirect(entry.redirectURL);

})

app.listen(PORT, () => { console.log("server started at port")})