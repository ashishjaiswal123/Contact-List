const express = require('express');
const path = require('path');
// const { title } = require('process');
const port = 8000;

//give db (mongodb) just above initialization of express
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.urlencoded());     //middleware this read only the forms data which have been submitted not the params

app.use(express.static('assests'));  //middleware

var ContactList = [
    {
        name : 'ashish',
        phone :'99999999'
    },
    {
        name : 'Tony Stark',
        phone : '11111111'
    },
    {
        name : 'Hulk',
        phone : '12345'
    }
]

app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"My ContactList",
            contact_list : contacts
        });

    });


    // return res.render('home',{
    //     title:"My ContactList",
    //     contact_list : ContactList
    // });
}); 

app.get('/practice',function(req,res){
    return res.render('practice',{
        title : "lets play with ejs"
    })
})

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // ContactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });
    
    // ContactList.push(req.body);

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating contact');
             return;
        }
        console.log('******',newContact);
        return res.redirect('back');
    });
    //  
});

app.get('/delete-contact',function(req,res){  
    //  here phone is varriable, using param "/delete-contact/phone" in get()
    // console.log(req.params);

    // get the id from the query in the url

    // console.log(req.query);
    // let phone = req.query.phone;
    let id = req.query.id;

    //find the contact in the database using id and delete it

    // let contactIndex = ContactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     ContactList.splice(contactIndex,1);
    // }
       Contact.findByIdAndDelete(id, function(err){
           if(err){
               console.log('error in deleting contact in the database');
               return;
           }
           return res.redirect('back');
       })
    //  return res.redirect('back');
});


app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('my express server is running on port',port);
});