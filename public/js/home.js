const http=require('http');
const fs=require('fs');
const path=require('path');
let PORT=process.env.PORT|8000;
http.createServer((req,res)=>{
    var loc=req.url==='/'?'home.html':req.url;
    var type='text/html';
    if(path.parse(loc).ext==='')
        loc=loc+'.html';
    switch(path.parse(loc).ext)
    {
        case '.css': type='text/css';
                    break;
        case '.js': type='text/javascript';
                    break;
        case '.ico': type='image/x-icon';
                    break;
    }
    loc=path.join(__dirname,loc);
    fs.readFile(loc,(err,data)=>{
            if(err)
            {

            }
            else
            {
                res.writeHead(200,{'Content-Type':type});
                res.write(data);
            }
            res.end();
    });
}).listen(8000,'192.168.42.134',()=>{console.log(`Server running at ${PORT}`)});