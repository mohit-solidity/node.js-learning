import http from "http";
import fs from "fs/promises";


const server = http.createServer(async (req,res)=>{
    if(req.url==="/get" && req.method==="GET"){
       const data = JSON.parse(await fs.readFile("./users.json","utf-8"));
        return res.end(`Hello Getting Users\nUsers : ${JSON.stringify(data)}`);

    }
    if(req.url==="/add" && req.method==="POST"){
        let body = ""
        req.on("data",(chunk)=>{
            body += chunk;
        })
        req.on("end",async ()=>{
            try{
                let data = JSON.parse(body);
                if(typeof data.name!== "string" || !data.name.trim()){
                    return res.end(`Invalid Data`);
                }
                let fileData = [];
                try{
                    fileData = JSON.parse(await fs.readFile("./users.json","utf8"));
                }catch(readError){
                    console.log(`Error : ${readError}`);
                }
                const user = {
                    id: fileData.length + 1,
                    name: data.name.trim(),
                }
                fileData.push(user);
                await fs.writeFile("./users.json", JSON.stringify(fileData,null,2),"utf8");
                res.end(`Done Adding`);
            }catch(err){
                res.end(`Error : ${err}`)
            }
        })
    }
})

server.listen(3000,()=>{
    console.log(`Server Is Live`);  
})