import http from "http";
import data from "./data.json" with {type:"json"};

const server = http.createServer((req,res)=>{
        if(req.url==="/"){
            res.end(`Main Page`);
            return;
        }
        if(req.url==="/about"){
            res.end(`About Section`);
            return;
        }
        if(req.url === "/users" && req.method === "GET"){
            res.statusCode = 200;
            res.end(`Data : ${JSON.stringify(data)}`)
        }
        if(req.url.startsWith("/users/") && req.method === "GET"){
            const url = new URL(req.url , `http://${req.headers.host}`);
            const name = url.searchParams.get("name");
            res.end(`Data Is : ${name}`);
            return;
        }
})
server.listen(3000);