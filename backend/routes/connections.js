const router = require('express').Router();
let Connection = require('../models/connection.model');

router.route('/').get((req,res) =>{
    Connection.find()
        .then(connections => res.json(connections))
        .catch(err => res.status(400).json('Error: ' + err));

});

//TODO add function that pushes the post ID to the user arrays
//require connections and users for operation^
router.route('/add').post((req,res) =>{
    const userA = req.body.userA;
    const userB = req.body.userB;
    const status = 'pending';
    

    const newConnection = new Connection({
        userA,
        userB,
        status

    });
    newConnection.save()
        .then(() => res.json('Connection added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Connection.findById(req.params.id)
        .then(connection => res.json(connection))
        .catch(err => res.status(400).json('Error: ' + err));
});

//TODO remember to delete photo from FS at the same time
router.route('/:id').delete((req,res) =>{
    Connection.findByIdAndDelete(req.params.id)
        .then(() => res.json('Connection deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/accept/:id').post((req,res) =>{
    Connection.findById(req.params.id)
        .then(connection => {
            connection.status = 'connected';
           
            connection.save()
                .then(() => res.json('Connection Accepted!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;