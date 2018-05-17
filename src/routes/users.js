const router = require('express').Router();
const userService = require('../bll/users');

router.route('/')
    .post( async (req, res) => { 
        try {
            let user = {};
            if(req.body.name)
                user.name = req.body.name;
            else
                res.status(422).send('Name is required');
            if(req.body.email)
                user.email = req.body.email;
            if(await userService.insertUser(user))
                res.status(200).send('User added.');   
            else     
                res.status(400).send('Something went wrong....');
        } catch (err) {
            res.status(500);
        }            
    });
    
module.exports = router;