const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(`${__dirname}/date.js`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

console.log(require(`${__dirname}/date.js`));

const todoItems = ['Do poop', 'Clean toilet', 'Wash butt'];
const workItems = [];

app.get('/', (req, res) => {
  res.render('list', { listTitle: date.getPrettyDate(), listItems: todoItems });
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', listItems: workItems });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/', (req, res) => {
  let { newListItem, listType } = req.body;
  if (newListItem) {
    if (listType === 'Work') {
      workItems.push(newListItem);
      res.redirect('/work');
    } else {
      todoItems.push(newListItem);
      res.redirect('/');
    }
  }
});

app.listen(3000, () => console.log('Server running.'));
