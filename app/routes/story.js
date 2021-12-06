const express = require('express');
const router = express.Router();
const { checkAuth, checkAuthAndAdmin } = require('../middleware/check-auth')
const Story = require('../models/Story')
const View = require('../models/View')



// Handling POST request to /Story
router.post('/', checkAuth, (req, res) => {

    const story = new Story({
        imageLink: req.body.imageLink,
    })
    story
        .save()
        .then(result => {

            res.status(201).json({
                result
            })
                .catch(err => {

                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                });
        })

});

// Handling GET request to /story
router.get('/', checkAuth, (req, res) => {
    Story.find()
        .select('imageLink _id viewedBy')
        .exec()
        .then(docs => {
            // console.log(docs)
            const response = {
                Stories: docs.map(doc => {
                    return {
                        imageLink: doc.imageLink,
                        viewedBy: doc.viewedBy,
                        count: doc.viewedBy.length,
                        _id: doc._id

                    }
                })
            };
            res.status(200).json(response)
            // res.status(200).json(docs)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// Handling GET by ID request to /story
router.get('/:imageId', checkAuth, (req, res) => {
    const id = req.params.imageId

    Story.findById(id)
        .exec()
        .then(story => {
            if (story) {
                res.status(200).json({
                    story
                })
            }
            else {
                res.status(404).json({ Message: "Not found." })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

    var obj = { name: req.userData.name };
    Story.findOneAndUpdate(
        { _id: id },
        { $push: { viewedBy: obj }, $inc: { count: 1 } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });

})



// Handling PATCH request to /story
router.patch('/:imageId', checkAuth, (req, res) => {
    const id = req.params.imageId;

    Story.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {

            console.log(result);
            res.status(200).json({
                message: 'Product updated'

            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// Handling DELETE request to /story
router.delete('/:imageId', checkAuth, (req, res, next) => {
    const id = req.params.imageId;
    Story.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted'

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
});


module.exports = router;