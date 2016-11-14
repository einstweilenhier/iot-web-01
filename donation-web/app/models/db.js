'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let dbURI = 'mongodb://localhost/donation'; //mongodb://donationuser:donationuser@ds153637.mlab.com:53637/donation
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
  if(process.env.NODE_ENV != 'production') {
    var seeder = require('mongoose-seeder');
    let data = require('./data.json');
    let Donation = require('./donation');
    let User = require('./user');

    seeder.seed(data, { dropDatabase: false, dropCollections: true}).then(dbData => {
      console.log('seeding data');
      console.log(dbData);
    }).catch(err => {
      console.log(err);
    });
  }
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});