const express = require('express');

const app = express();

const items = [
  { id: 1, name: 'item1' },
  { id: 2, name: 'item2' },
];

const middleware1 = (req, res, next) => {
  console.log("doing stuff in middleware 1");
  next();
}

const middleware2 = (req, res, next) => {
  console.log('doing stuff in middleware 2');
  next();
}

const extractUserName = (req, res, next) => {
  if (req.query.name) {
    req.userName = req.query.name;
  } else {
    res.status(400).send('You have to specify a "name" query parameter call this')
  }
}
const handleError = (err, req, res, next) => {
  console.error(err);
}
//app.use(middleware1);
//app.use(middleware2);


app.get('/myroute', middleware2, (req, res) => {
  console.log('handling /myroute');
  res.send(items);
});

app.get('/hello', extractUserName, (req, res) => {
  console.log("handling /hello");
  console.log(`Hello, ${req.userName}`)
  res.send(`Hello, ${req.userName}`);
});

app.get('/syncError', (req, res) => {
  setTimeout(() => {
    throw new Error("Boom! async")
  }, 1000);
})

app.use(handleError);

app.listen(5000, () => console.log('server listening on port 5000'));
