const Cake = require('../models/cake.js')

module.exports = {
    index: function(req, res){
      Cake.find()
        .then(cakes => res.json(cakes))
        .catch(err => res.json(err))
    },
    create: function(req, res){
      Cake.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    remove: function(req, res){
      Cake.deleteOne({_id: req.params.id})
        .then(data => res.json(data))
        .catch(err => res.json(err))
    },
    show: function(req, res){
      Cake.findOne({_id: req.params.id})
        .then(cake => res.json(cake))
        .catch(err => res.json(err))
    },
    update: function(req, res){
        Cake.updateOne({_id: req.params.id}, {
          $push: {ratings: JSON.parse(req.body.rating), comments: (req.body.comment)}
        })
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
}