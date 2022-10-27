const express = require('express');
const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');

const PORT = 3001;

const app = express();



app.get("/", (req,res) =>
    res.sendFile(path.join(__dirname, 'public/index.html')));

app.get("/notes", (req,res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get("/api/notes", (req,res) =>
    {
        fs.readFile(path.join(__dirname,'db/db.json'), 'utf-8', (err,data)=>{
            if(err)
            {
                console.log(err);
                next(err);
            }
            else
            {
                const notes = JSON.parse(data);
                res.json(notes)
            }
        })

        // res.json() send db 
    }
)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );