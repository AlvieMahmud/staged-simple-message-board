"use strict";

// message board app
// stage 5: refactor to separate http/web code from core logic
const express = require('express');
const app = express();
const mb = require('./messageboard');

app.use(express.static('client'));

function getMessages(req, res) {
  res.json(mb.getMessages());
}

function getMessage(req, res) {
  let result = mb.getMessage(req.params.id);
  if (!result) { res.status(404).send("No match for that ID."); }
  res.json(result);
}

function postMessage(req, res) {
  const messages = mb.addMessage(req.body.msg);
  res.json(messages);
}

app.get("/messages", getMessages);
app.get("/messages/:id", getMessage);
app.post("/messages", express.json(), postMessage);

app.listen(8080);
