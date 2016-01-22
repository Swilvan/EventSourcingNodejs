'use strict';

const express = require('express')
  , bodyParser = require('body-parser')
  , model = require('./model')
  ;

const app = express();
app.use(bodyParser.json());

const users = []
  , globalEvents = []
  ;


app.post('/user', function (request, response) {
  let userCreated = model.CreateUser.new(request.body);
  let user = userCreated.apply();

  globalEvents.push(userCreated);
  users.push(user);

  console.log(`Event stored UserCreated: ${JSON.stringify(userCreated)}`);
  console.log(`User created: ${JSON.stringify(user)}`);

  response.status(200).send('Created');
});

app.put('/user/:id/name', function (request, res) {
  let userId = request.params.id;

  let nameChangeEvt = model.UserNameChanged.new(request.body);
  let user = users.find(user =>
                          user.id === userId);

  user.events.push(nameChangeEvt);

  res.status(200).send(`User ${user.name} changed name to ${nameChangeEvt.userName}`)
});

app.get('/user/:id', function (request, response) {
  let user = users.find(user=> user.id === request.params.id);
  response.status(200).send(user.current());
});

const port = 3000;

app.listen(port);
console.log(`Listening on port ${port}`);