const router = require('express').Router();
const express = require('express');
const multer = require('multer');
const upload = multer({dest: '../image_uploads'});
const fs = require('fs')

router.post('/upload', upload.single('photo'), (req, res) => {
    const tempPath = req.file.path;
    //kinda sketch move here, renaming path the post object id for direct fs access in the future
    const targetPath = path.join(__dirname, "../image_uploads/"+req.body.id+".png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
});
//for getting the image, you can access the image by its source directly from html


module.exports = router;