const express = require('express')

const router = express.Router();

router.get('/',(req,res) => {
    res.render('index',{
        title:'my first app',
        content:'lorem ipsum ...'
    })
})

module.exports = router;