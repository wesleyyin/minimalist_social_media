const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req,res) =>{
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));

});

//TODO add function that pushes the post ID to the user arrays
//require connections and users for operation^
router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const caption = req.body.caption;
    const hasPhoto = Boolean(req.body.hasPhoto);

    const newPost = new Post({
        username,
        caption,
        hasPhoto

    });
    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

//TODO remember to delete photo from FS at the same time
router.route('/:id').delete((req,res) =>{
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) =>{
    Post.findById(req.params.id)
        .then(post => {
            post.username = req.body.username;
            post.caption = req.body.caption;
            post.hasPhoto = Boolean(req.body.hasPhoto);
            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;