const express = require('express');
const router = express.Router();
const messagesController = require('../../../controllers/api/v1/messages');

/*const mongoose = require('mongoose');

const Message = require('../../../models/message');*/

/* /api/v1/messages */
router.get('/', messagesController.getAll);
router.post('/', messagesController.create);


module.exports = router;

/*

router.get('/', (req, res) => {
    res.send("GET messages");
});
router.post('/', messagesController.create);
router.put('/:id', messagesController.update);
router.delete('/:id', messagesController.remove);
*/
  
  // GET api/v1/messages
  // POST api/v1/messages

/*router.post('/', (req, res, next) => {
    const message = new Message({
        _id: new mongoose.Schema.Types.ObjectId(),
        value: req.body.text
    });
    message.save().then(result => { //will store in the database
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST request to /messages',
        createdMessage: message
    });
});*/
/*
router.post('/', function(req, res) {
    const m = new Message();
    m.user = "Thomas";
    m.message = "hi there!";
    m.save(function (err, doc) {
        if (err) return console.error(err);
        res.send(doc);
    })
})

router.get('/', function (req, res) {
     res.send('GET MESSAGES');
})

router.get('/:id', function (req, res){
    res.send('GET MESSAGE WITH ID ' + req.params.id);
})

module.exports = router;*/