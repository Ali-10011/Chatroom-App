const express =require('express');
const { request } = require('http');
const { Session } = require('inspector');
const mongoose = require('mongoose');
const { isNull } = require('util');
const ChatData = require('./models/ChatData');
var SessionUser;
const app = express();

app.set('view engine', 'ejs'); //ejs looks for view files in a "view" folder, so you have to have one made
app.use(express.urlencoded({ extended: true })); //some sort of encoding, to make sure data doesn't get crappy

const uri = 'mongodb+srv://Art:Art0309@node-practice.jknzmex.mongodb.net/Chat-App'; //name of the database we want to access, otherwise it will assign it to a database named "test"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{console.log('Connected');app.listen(3000);}).catch((err)=>{console.log(err)});
 //we only want to listen to request when the database has been connected
 //listen from port number 3000, it automatically knows it's localhost
app.get('/', (req, res) => {
    res.redirect('/login');
  });
  //on one page, you can either one of each type request
  app.get('/login', (req, res) => {
    res.render('login', { title: 'Auth' }); //it will render login.ejs file
  }); //we can send variable that ejs will render
  
  app.post('/login', (req, res) => {
    const Chat = new ChatData(req.body);
    console.log(req.body);
    if(req.body.Auth == "signup")
    {   
        ChatData.findOne({ 'username': req.body.username }, function (err, person) { //returns a callback function
            if (err) return handleError(err);
            // Prints "Space Ghost is a talk show host".
            if(person)
            {
           console.log("This Person Already exists");
           return res.redirect('/login');           
            }
            else 
            {
            Chat.message = 'joined';
            SessionUser = Chat.username;
            Chat.save()
             .then(result => {
              res.redirect('/Home');
            })
             .catch(err => {
             console.log(err);
                 }); 
                }
          });
   
}
else 
  {
    ChatData.findOne({ 'username': req.body.username }, function (err, person) { //returns a callback function
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        if(person)
        {
            if(person.password == Chat.password)
            {
                console.log("Authenticated");
                SessionUser = Chat.username;
                return res.redirect('/Home');
            }
            else 
            {
                console.log("Wrong Password");
                return res.redirect('/login');
            }       
        }
        else 
        {
       console.log("This user does not exist, Perhaps Try signing in");
       return res.redirect('/login');
            }
      });
  }
  });
  
  app.get('/Home', (req, res) => {
   
    res.render('Home', { username: SessionUser }); //it will render login.ejs file
  }); 