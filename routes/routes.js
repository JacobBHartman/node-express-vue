var express = require('express');
var router  = express.Router();

var mongojs = require('mongojs')
var db = mongojs('tribeapp', ['people'])
var ObjectId = mongojs.ObjectId;

// Declare middleware specific to an express router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Declare routes
router.get('/', function(req, res){
    db.people.find(function(err, docs) {
        console.log(docs);
        res.render('index', {
            title: 'Family',
            people: docs
        });
    })
});

router.post('/people/add', function(req, res){

    req.checkBody('full_name', 'Full Name is required.').notEmpty();
    req.checkBody('father', 'Father is required.').notEmpty();
    req.checkBody('mother', 'Mother is required.').notEmpty();

    var errors = req.validationErrors();
    console.log(errors)

    if(errors){
        res.render('index', {
            title: 'Family',
            people: people,
            errors: errors
        });
    } else {
        var newPerson = {
            full_name: req.body.full_name,
            father:    req.body.father,
            mother:    req.body.mother
        }
        db.people.insert(newPerson, function(err, result){
            if(err){
                console.log(err);
            }
            res.redirect('/');
        });
    }
});

router.delete('/people/delete/:id', function(req, res){
    db.people.remove({_id: ObjectId(req.params.id)}, function(err, result){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
});


// 
module.exports = router;
