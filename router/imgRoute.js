const express = require("express");
const mongoose = require('mongoose');
const UserImage = mongoose.model("Multer");
const router = express.Router();
const upload  = require('../diskStorage')

const imgData = UserImage.find({});
// console.log(imgData)

// uploading single picture
router.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            res.render('index',{error:err.message})
        }
        else{
        console.log(req.file)
        if (!req.file) {
                res.render('index', {
                    msg: "error : no file selected"
                });
            } else {
                var imagefile=req.file.filename;
                var imageDetails=new UserImage({
                    imgname:imagefile
                });
                imageDetails.save((err,doc)=>{
                        if(err) throw err;
                        

                        // after saving displaying that images
                        imgData.exec((err,data)=>{
                            if(err) throw err;
                            res.render('index', {
                            msg: "File Uploaded Successfully",
                            records:data,
                           
                        });
                        })
                });

                

                
            }}
        });
});

router.get("/",(req,res)=>{
    imgData.exec((err,data)=>{
        if(err) throw err;
        imgData.find().then(data=>{
            console.log(data)
            res.render('index', {
                records:data
            });
        })

    })
})

module.exports=router;

