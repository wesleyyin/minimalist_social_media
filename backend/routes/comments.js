const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((req,res) =>{
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/:id').get((req,res) =>{
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req,res) =>{
    const content = req.body.content;
    const user = req.body.user;
    const post = req.body.id;// post id the Comment will be added to
    

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