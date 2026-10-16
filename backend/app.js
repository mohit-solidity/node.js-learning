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
            const email = url.searchParams.get("email");
            const searchedData = data.filter((user)=>{
                const nameMatch = name===null || user.name.toLowerCase() === name.toLowerCase();
                const emailMatch = email===null || user.email.toLowerCase() === email.toLowerCase();
                return nameMatch && emailMatch;
            })
            res.setHeader("content-type","application/json");
            res.end(JSON.stringify({
                name,
                email,
                searchedData
            }));
            return;
        }
})
server.listen(3000);