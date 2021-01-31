const fs = require('fs');
const path = require('path');

module.exports = app => {
    // notes variable
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        // Start API Routes
        app.get('/api/notes', function (req, res) {
            res.json(notes);
        });

        app.post('/api/notes', function (req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log('Added a new note: ' + newNote.title);
        });

        app.get('api/notes/:id', function (req, res) {
            res.json(notes[req.params.id]);
        });

        app.delete('/api/notes/:id', function (req, res) {
            notes.splice(req.params.id, 1);
            updateDB();
            console.log("Deleted note with id " + req.params.id);
        });

        // Start HTML routes
        app.get('/notes', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        function updateDB() {
            fs.writeFile('db/db.json', JSON.stringify(notes, '/t/'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}