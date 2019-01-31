// Import modules
const express = require('express');
const router = express.Router();

// Load user model
const Person = require("../models/Person.js")

// Get index page which is a de facto "get all people"
router.get('/', function(req, res){
    Person.find( function (err, docs){
        console.log(docs);
        res.render('index', {
            title: 'Family',
            people: docs
        });
    })
});

// Add a person if all fields are submitted
router.post('/people/add', function(req, res){

    req.checkBody('full_name', 'Full Name is required.').notEmpty();
    req.checkBody('father', 'Father is required.').notEmpty();
    req.checkBody('mother', 'Mother is required.').notEmpty();

    let errors = req.validationErrors();
    console.log(errors)

    if(errors){
        Person.find( function (err, docs){
            console.log(docs);
            res.render('index', {
                title: 'Family',
                errors: errors,
                people: docs
            });
        });

    } else {
        var newPerson = new Person({
            full_name: req.body.full_name,
            father:    req.body.father,
            mother:    req.body.mother
        });
        newPerson.save(function (err, newPerson) {
            if(err){
                console.log(err);
            }
        })
        res.redirect('/');
    }
});

// Delete a person
router.delete('/people/delete/:id', function(req, res){
    Person.deleteOne({ _id: req.params.id }, function (err) {
        if(err){
            console.log(err);
        };
        res.redirect('/')
    })
});

module.exports = router;