const router = require('express').Router();
const userService = require('../bll/users');

router.route('/')
    .post( (req, res) => { 
        try {
            let user = {};
            if(req.body.name && req.body.name !== '') {
                user.name = req.body.name;
            } else {
                throw new Error('Name is required.');
            }
            if(req.body.email) {
                user.email = req.body.email;
            }
            userService.insertUser(user, (error, result, fields) => {
                if(error) {
                    throw new Error(error);
                } else {
                    res.status(200).send('User added.');
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }            
    });
    
module.exports = router;