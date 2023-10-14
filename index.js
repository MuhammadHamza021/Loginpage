const path = require("path");
const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/saveinfo',{useNewUrlParser: true});

    //   use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
port = 8000;
// For serving static files

// Set the views directory
var saveinfo = new mongoose.Schema({
    name: String,
    password: String,
});
var data = mongoose.model('got', saveinfo);
app.use('/static', express.static('static'))
main().catch(err => console.log(err));


app.use(express.urlencoded())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
res.render('demo.pug')
});
app.post('/', (req, res) => {
    const userinfo = new data(req.body);
    userinfo.save().then(() => {
        res.send("This item has been saved to db")
    }).catch(() => {
        res.status(400).send("Item Not Saved To Db")
    })
})


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
