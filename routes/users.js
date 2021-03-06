var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Set up Mongoose schema
var Users = require('../models/user');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

// This route just renders the signup page
userRouter.get('/signup', function(req, res, next) {
  res.render('../public/signup');
});

userRouter.route('/signup/data')
          .post(function(req, res, next) {
            Users.create({email: req.body.email, password: req.body.password, name: req.body.name, city: req.body.city, state: req.body.state, requests: req.body.requests}, function(err, user) {
              if (err) throw err;
              if (user) {
                res.send(user);
              }
              else {
                res.writeHead(401);
                res.end("Bad Signup");
              }
            });
          });

// This route just renders the login page
userRouter.get('/login', function(req, res, next) {
  res.render('../public/login');
});

userRouter.route('/login/data')
          .post(function(req, res, next) {
            Users.find({'email': req.body.email})
                 .where('password').equals(req.body.password)
                 .exec(function(err, user) {
                   if (err) throw err;
                   if (user[0]) {
                     user.redirect = '/books'
                     res.setHeader('Set-Cookie', ['type=login', 'language=javascript', 'path=/']);
                     res.send(user);
                   } else {
                     res.writeHead(401);
                     res.end('Bad Login');
                   }
                 })
          });

// This route just renders the edit page
userRouter.get('/edit', function(req, res, next) {
  res.render('../public/edit');
});

// Route for user changing their profile info
userRouter.route('/edit/data')
          .put(function(req, res, next) {
            Users.findByIdAndUpdate(req.body.id, { name: req.body.name, city: req.body.city, state: req.body.state }, {new: true}, function(err, update) {
              if (err) throw err;
              res.send(update);
            });
          });

// Update user profile when they have a pending book request
userRouter.route('/request/data')
          .put(function(req, res, next) {
            Users.findByIdAndUpdate(req.query.owner, {$push: { 'requests': req.query.bookId }}, {new: true}, function(err, user) {
              if (err) throw err;
              res.send(user);
            });
          });

// Update user profile when they have a pending book request
userRouter.route('/confirm/data')
          .put(function(req, res, next) {
            Users.findByIdAndUpdate(req.query.owner, {$pull: { 'requests': req.query.bookId }}, {new: true}, function(err, user) {
              if (err) throw err;
              res.send(user);
            });
          });

module.exports = userRouter;