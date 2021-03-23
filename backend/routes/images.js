const router = require('express').Router();
const express = require('express');
const multer = require('multer');
const upload = multer({dest: '../image_uploads'});
const fs = require('fs')

router.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});
//for getting the image, you can access the image by its source directly from html

router.route('/:id').delete((req,res) =>{
    const path = '../image_uploads/';
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;