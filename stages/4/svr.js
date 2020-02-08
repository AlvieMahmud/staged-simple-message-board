// message board app
// stage 4: An API route for every message
const express = require('express');
const app = express();
const uuid = require('uuid-random');

app.use(express.static('client'));

let messages = [
  {id: "xnshfdsafasd", msg: "these are three default messages", time: "default"},
  {id: "dskjdshkjhsd", msg: "delivered from the server", time: "default"},
  {id: "vcxbxcvfggzv", msg: "using a custom route", time: "default"}
];

app.get("/messages", (req, res) => {
  res.json(messages);
});


app.get("/messages/:id", (req, res) => {
  for (const message of messages) {
    if (message.id === req.params.id) {
      res.json(message);
      return;  // short
    }
  }
  res.status(404).send("No match for that ID.")
});

app.post("/messages", express.json(), (req, res) => {

  const newMessage = {
    id: uuid(),
    msg: req.body.msg,
    time: Date()
  };
  messages = [newMessage, ...messages.slice(0,9)];
  res.json(messages);
});

app.listen(8080);
