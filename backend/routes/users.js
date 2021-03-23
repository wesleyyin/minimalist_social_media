const router = require('express').Router();
const bcrypt = require("bcryptjs");
let User = require('../models/user.model');

router.route('/').get((req,res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/login').post((req,res) =>{
    User.findOne({name : req.body.username}, function (err, exists){
        if (!exists.length){
            res.json({status: false, msg: 'Incorrect Username or Password'});
        }else{
            if(!Bcrypt.compareSync(request.body.password, exists.password)) {
                res.json({status: false, msg: 'Incorrect Username or Password'});
            }else{
                res.json({status: true, msg: 'You have logged in!'});
            }

        }
    });

});
//updating bio and username
router.route('/update').post((req,res) =>{
    User.findOne({name : req.body.username}, function (err, exists){
        if (!exists.length){
            res.json({msg: 'User DNE'});
        }else{
            

        }
    });

});
//check if username exists before doing anything
router.route('/register').post((req,res) =>{
    User.find({name : req.body.username}, function (err, exists){
        if (exists.length){
            res.json('Username already exists')
        }else{
            const username = req.body.username;
            const password = Bcrypt.hashSync(req.body.password, 10);
            const posts = [];
            const notifications = [];
            const bio = req.body.bio;
            const newUser = new User({
                username,
                password,
                posts,
                notifications,
                bio
            });

            newUser.save()
                .then(users => res.json('User added!'))
                .catch(err => res.status(400).json('Error: ' + err));
            }
    });
});

module.exports = router;