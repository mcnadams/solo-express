const { Router } = require('express');
const Tweet = require('../models/Tweet');
const futuramaQuote = require('../middleware/futurama-quote');

//create a tweet
module.exports = Router()
    .post('/', futuramaQuote, (req, res, next) => {
        const {
            handle, 
            body
        } = req.body;

        Tweet
            .create({ handle: handle || req.handle, body: body || req.quote })
            .then(createdTweet => {
                res.send(createdTweet);
            })
            .catch(err => {
                next(err);
            });
    })

    .get('/', (req, res, next) => {
        Tweet
            .find()
            .then(tweets => res.send(tweets))
            .catch(err => {
                next(err);
            });
    })

    .get('/:id', (req, res, next) => {
        const { id } = req.params;
        Tweet
            .findById(id)
            .then(tweet => res.send(tweet))
            .catch(err => {
                next(err);
            });
    })

    .put('/:id', (req, res, next) => {
        const { id } = req.params;
        const {
            handle, 
            body
        } = req.body;

        Tweet
            .findByIdAndUpdate(id, { handle, body })
            .then(tweet => res.send(tweet))
            .catch(err => {
                next(err);
            });
    })

    .delete('/:id', (req, res, next) => {
        const { id } = req.params;
        Tweet
            .findByIdAndDelete(id)
            .then(response => res.send(response))
            .catch(err => {
                next(err);
            });
    });

