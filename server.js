const express=require('express');
const path=require('path');
const fs=require('fs');
const bodyParser=require('body-parser');
const expressHbs=require('express-handlebars');
const PORT=process.env.PORT||5000;
const host='0.0.0.0';
const app=express();

app.engine('hbs',expressHbs({extname:'.hbs',defaultLayout:'main',layoutsDir:path.join(__dirname,'views','layouts')}));
app.set('view engine','hbs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res,next)=>{
    res.render('home',{layout:false});
});
app.get('/record',(req,res,next)=>{
    let file=path.join(__dirname,'data','users.json');
    let usr=[];
    fs.readFile(file,(err,data)=>{
            usr=JSON.parse(data);
            res.render('record',{layout:false,has:usr.length>0,user:usr});
    })
});
app.post('/',(req,res,next)=>{
    let file=path.join(__dirname,'data','users.json');
    let usr=[];
    let resu;
    if(req.body.score1>req.body.score2)
        resu="Win";
    else if(req.body.score1<req.body.score2)
        resu="Lost";
    else
        resu="Draw";
    fs.readFile(file,(err,data)=>{
        if(!err)
        {
            usr=JSON.parse(data);
        }
        usr.push({"name":req.body.user,"score1":req.body.score1,"score2":req.body.score2,"result":resu});
        fs.writeFile(file,JSON.stringify(usr),(err)=>{});
    });
    res.redirect('/record');
});
app.use((req,res,next)=>{
    res.status(404).render('404',{layout:false});
});
app.listen(PORT,host);