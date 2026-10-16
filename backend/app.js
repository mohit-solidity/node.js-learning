import http from "http";

const server = http.createServer((req,res)=>{
    try{
        if(req.url==="/"){
            res.end(`Server Is Running`);
            return;
        }
        if(req.url==="/about"){
            res.end(`About Section`);
            return;
        }
        if(req.url==="/photo"){
            res.end(`Your Photu`);
            return;
        }
    }catch(err){
        res.end(`Error : ${err}`);
        return;
    }
})
server.listen(3000);