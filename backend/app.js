import http from "http";
import data from "./data.json" with {type:"json"};

const server = http.createServer((req,res)=>{
    const users = [];
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

        if(req.url==="/users" && req.method==="POST"){
            let body = "";

            req.on("data",(chunk)=>{
                body += chunk;
            })
            req.on("end",()=>{
                try{
                    let data = JSON.parse(body);
                    console.log(`Data : ${JSON.stringify(data)}`);
                    
                    const user = {
                        id: users.length + 1,
                        name: data.name.trim(),
                    }
                    users.push(user);
                    console.log(`In Parsing : ${JSON.parse(body)}`);
                    
                    console.log(`Users : ${JSON.stringify(users)}`);
                    
                    return res.end(`Data : ${JSON.stringify(users)}`)
                }catch(err){
                    return res.end(`Error : ${err.message}`);
                }
            })
        }
        // // POST 
        // if(req.url==="/users" && req.method==="POST"){
        //     let body = "";

        //     req.on("data", (chunks)=>{
        //         body += chunks;
        //     })
        //     console.log(`Body : ${body}`);
            
        //     req.on("end",()=>{
        //         try{
        //             const data = JSON.parse(body);
        //             console.log(`Data : ${JSON.stringify(data)}\nName : ${data.name}`);
                    
        //             if(typeof data.name !== "string" || !data.name.trim()){
        //                 req.statusCode = 400;
        //                 return res.end(`Invalid Data`)
        //             }
        //             const user = {
        //                 id: users.length +1,
        //                 name: data.name.trim()
        //             }
        //             console.log(`User : ${JSON.stringify(user)}`);
                    
        //             req.statusCode = 200;
        //             users.push(user);
        //             res.setHeader("content-type", "application/json")
        //             return res.end(`Data Here : ${JSON.stringify(user)}`);
        //         }catch(err){
        //             req.statusCode = 400;
        //             return res.end(`Error : ${err}`);
        //         }
        //     })
        //}
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
server.listen(3000, ()=>{
    console.log(`Server Running On LocalHost 3000`);
});