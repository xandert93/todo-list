const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { connect, connection, Schema, model } = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const db = 'toDoListDB';
connect(`mongodb://localhost:27017/${db}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = model('Item', itemSchema);

let poop = new Item({ name: 'Do Poop' });
let cT = new Item({ name: 'Clean Toilet' });
let wB = new Item({ name: 'Wash Butt' });

let defaultItems = [poop, cT, wB];

const listSchema = new Schema({
  name: String,
  listItems: [itemSchema],
});

const List = model('List', listSchema);

app.get('/', (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (!foundItems.length) {
      Item.insertMany(defaultItems);
      res.redirect('/');
    } else res.render('list', { listTitle: 'Today', listItems: foundItems });
  });
});

app.get('/:slug', (req, res) => {
  const customListName = _.capitalize(req.params.slug);
  List.findOne({ name: customListName }, (err, foundList) => {
    if (foundList) {
      res.render('list', {
        listTitle: customListName,
        listItems: foundList.listItems,
      });
    } else {
      const userList = new List({
        name: customListName,
        listItems: defaultItems,
      });
      userList.save();
      res.redirect(`/${customListName}`);
    }
  });
});

app.post('/', (req, res) => {
  let itemName = req.body.newListItem;
  let listTitle = req.body.listType;
  let item = new Item({ name: itemName });

  if (listTitle === 'Today') {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({ name: listTitle }, (err, foundList) => {
      foundList.listItems.push(item);
      foundList.save();
      res.redirect(`/${listTitle}`);
    });
  }
});

app.post('/delete', (req, res) => {
  let deleteId = req.body.checkbox;
  let listTitle = _.capitalize(req.body.listType);

  if (listTitle === 'Today') {
    Item.findByIdAndDelete(deleteId, () => {
      res.redirect('/');
    });
  } else {
    List.updateOne(
      { name: listTitle },
      { $pull: { listItems: { _id: deleteId } } },
      () => {
        res.redirect(`/${listTitle}`);
      }
    );
  }
});

app.listen(3000, () => console.log('Server running.'));
