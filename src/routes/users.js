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
            userService.insertUser(user, (error) => {
                if(error) {
                    throw new Error(error);
                } else {
                    res.status(200).send('User added.');
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }            
    })
    .get( (req, res) => {
        try {            
            if(userId) {
                userService.getAllUsers( (error, result) => {                
                    if(error) {
                        throw new Error(error);
                    } else {
                        res.status(200).json({ result: result });
                    }
                });
            }            
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    });

router.route('/:id')
      .get( (req, res) => {
        try {
            let userId = req.params.id;
            userService.getUserById( userId, (error, result) => {                
                if(error) {
                    throw new Error(error);
                } else {
                    res.status(200).json({ result: result });
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
      });
    
module.exports = router;