
const feathers = require('feathers');
const NeDB = require('nedb');
const path = require('path');
const service = require('feathers-nedb');

function services () {
  this.use('/users', service({ Model: userModel() }));
}

function userModel () {
  return new NeDB ({
    filename: path.join('..', 'db', 'users.db'),
    autoload: true
  });
}

const app = feathers().configure(services);

const users = app.service('/users');

Promise.all([
  users.create({ email: 'feload@archip.com', password: 'pwd1', role: 'admin' }),
  users.create({ email: 'mayela@indigu.com', password: 'pwd2', role: 'user' }),
  users.create({ email: 'antonio@rausher.com', password: 'pwd3', role: 'user' })
])
.then(results => {
  console.log('Users created!');

  return users.find()
    .then(results => console.log('find all items\n', results));
})
.catch(err => console.log('Error ocurred:', err));