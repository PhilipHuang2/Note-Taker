const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


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
                ;
                res.json(JSON.parse(data));
            }
        })
    }
)

app.post("/api/notes", (req,res) => {
    let note = req.body;
    note.id = uuidv4();
    fs.readFile(path.join(__dirname,"db/db.json"), 'utf-8', (err,data)=>{
        if(err)
        {
            console.log(err);
            next(err);
        }
        else
        {
            let db = JSON.parse(data);
            db.push(note);
            fs.writeFile(path.join(__dirname,"db/db.json"), JSON.stringify(db), err =>{
                err ? console.log(err) : console.info(`\nData written to ${path.join(__dirname,"db/db.json")}`);
            });
        }
    }) 

})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
    );