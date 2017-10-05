var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Publisher = require('../models/publisher');

var publisherRouter = express.Router();
publisherRouter.use(bodyParser.json());

publisherRouter.route('/')
.get(function (req, res, next) {
     Publisher.find(req.body)
        .populate('verticalId')
        .exec(function (err, publisher) {
        if (err) return next(err);
        res.json(publisher);
    });
})

.post(function (req, res, next) {
 
    Publisher.create(req.body, function (err, publisher) {
        if (err) return next(err);
        console.log('publisher created!');
        var id = publisher._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the publisher with id: ' + id);
    });
})

// .delete(function (req, res, next) {
//     Publisher.remove({}, function (err, resp) {
//         if (err) return next(err);
//         res.json(resp);
//     });
// });

// publisherRouter.route('/:publisherId')
// .get( function (req, res, next) {
//     Publisher.findById(req.params.publisherId)
//         .populate('comments.postedBy')
//         .exec(function (err, publisher) {
//         if (err) return next(err);
//         res.json(publisher);
//     });
// })

// .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
//     Publisher.findByIdAndUpdate(req.params.publisherId, {
//         $set: req.body
//     }, {
//         new: true
//     }, function (err, publisher) {
//         if (err) return next(err);
//         res.json(publisher);
//     });
// })

// .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
//         Publisher.findByIdAndRemove(req.params.publisherId, function (err, resp) {
//         if (err) return next(err);
//         res.json(resp);
//     });
// });

// publisherRouter.route('/:publisherId/comments')
// .all(Verify.verifyOrdinaryUser)

// .get(function (req, res, next) {
//     Publisher.findById(req.params.publisherId)
//         .populate('comments.postedBy')
//         .exec(function (err, publisher) {
//         if (err) return next(err);
//         res.json(publisher.comments);
//     });
// })

// .post(function (req, res, next) {
//     Publisher.findById(req.params.publisherId, function (err, publisher) {
//         if (err) return next(err);
//         req.body.postedBy = req.decoded._id;
//         publisher.comments.push(req.body);
//         publisher.save(function (err, publisher) {
//             if (err) return next(err);
//             console.log('Updated Comments!');
//             res.json(publisher);
//         });
//     });
// })

// .delete(Verify.verifyAdmin, function (req, res, next) {
//     Publisher.findById(req.params.publisherId, function (err, publisher) {
//         if (err) return next(err);
//         for (var i = (publisher.comments.length - 1); i >= 0; i--) {
//             publisher.comments.id(publisher.comments[i]._id).remove();
//         }
//         publisher.save(function (err, result) {
//             if (err) return next(err);
//             res.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             });
//             res.end('Deleted all comments!');
//         });
//     });
// });

// publisherRouter.route('/:publisherId/comments/:commentId')
// .all(Verify.verifyOrdinaryUser)

// .get(function (req, res, next) {
//     Publisher.findById(req.params.publisherId)
//         .populate('comments.postedBy')
//         .exec(function (err, publisher) {
//         if (err) return next(err);
//         res.json(publisher.comments.id(req.params.commentId));
//     });
// })

// .put(function (req, res, next) {
//     // We delete the existing commment and insert the updated
//     // comment as a new comment
//     Publisher.findById(req.params.publisherId, function (err, publisher) {
//         if (err) return next(err);
//         publisher.comments.id(req.params.commentId).remove();
//                 req.body.postedBy = req.decoded._id;
//         publisher.comments.push(req.body);
//         publisher.save(function (err, publisher) {
//             if (err) return next(err);
//             console.log('Updated Comments!');
//             res.json(publisher);
//         });
//     });
// })

// .delete(function (req, res, next) {
//     publisheres.findById(req.params.publisherId, function (err, publisher) {
//         if (publisher.comments.id(req.params.commentId).postedBy
//            != req.decoded._id) {
//             var err = new Error('You are not authorized to perform this operation!');
//             err.status = 403;
//             return next(err);
//         }
//         publisher.comments.id(req.params.commentId).remove();
//         publisher.save(function (err, resp) {
//             if (err) return next(err);
//             res.json(resp);
//         });
//     });
// });
module.exports = publisherRouter;