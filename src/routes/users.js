const router = require('express').Router();
const userService = require('../bll/users');

const multer = require('multer');
const upload = multer({ dest: './out' }).single('file');

/**
 * Insert user and get all users routes.
 */
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
            userService.getAllUsers( (error, result) => {                
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

/**
 * Get user by id, delete and update user routes.
 */
router.route('/:id')
      .get( (req, res) => {
        try {
            let userId = req.params.id;
            userService.getUserById( userId, (error, result) => {                
                if(error) {
                    throw new Error(error);
                } else {
                    if(result && result.length) {
                        res.status(200).json({ result: result });
                    } else {
                        res.status(404).send('User not found.');
                    }
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
      })
      .delete( (req, res) => {
        try {
            let userId = req.params.id;
            userService.deleteUser( userId, (error) => {                
                if(error) {
                    res.status(404).send(error.toString());
                } else {
                    res.status(200).send('User deleted.');
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
      })
      .put( (req, res) => {
        try {            
            let user = {};
            user = req.body;
            user.id = req.params.id;
            userService.updateUser( user, (error) => {                
                if(error) {
                    res.status(404).send(error.toString());
                } else {
                    res.status(200).send('User updated.');
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
      });

router.route('/upload')
      .post((req, res) => {
        try {
            upload(req, res, (err) => {
                if(err) throw new Error(err);
                if(req.file) {
                    userService.insertUserFromFile(req.file, (errors, msg) => {
                        if(errors && errors.length) {
                            res.status(200).send({ errors: errors });
                        }
                        res.status(200).send({ msg: msg});
                    });
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
      });
    
module.exports = router;