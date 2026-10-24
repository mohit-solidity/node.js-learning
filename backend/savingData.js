import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/add") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const newData = JSON.parse(body);

        if (typeof newData.name !== "string" || !newData.name.trim()) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("Data Is Invalid");
        }

        // FIX: Added 'await' so we read the actual text, not a Promise object
        let fileData = "[]";
        try {
          fileData = await fs.readFile("./users.json", "utf8");
        } catch (readError) {
          if (readError.code !== "ENOENT") throw readError;
        }
        
        const inJs = JSON.parse(fileData);

        const user = {
          id: inJs.length + 1,
          name: newData.name.trim(),
        };

        inJs.push(user);
        
        // FIX: Writes the updated array back to your JSON file
        await fs.writeFile("./users.json", JSON.stringify(inJs, null, 2), "utf8");

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User added successfully", user }));

      } catch (err) {
        console.error(`Error: ${err}`);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Error : ${err.message}`);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log(`Server Is Running On 3000`);
});
