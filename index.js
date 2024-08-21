import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let submissions = []; // Array to store submitted data
let issueAmount
let issueDate
let obligor
let id


app.get('/', (req, res) => {
    res.render('index.ejs', {
        submissions: submissions
    });
});

app.post("/submit", (req, res) => {
    issueAmount = req.body.issueAmount;
    issueDate = req.body.issueDate;
    obligor = req.body.obligor;
    id = Date.now(); // Generate a simple unique ID for demonstration
    
    // Add the new submission to the array
    submissions.push({ issueAmount, issueDate, obligor, id });


    // Render the page with all submissions
    res.render("index.ejs", { 
        submissions: submissions
    });
});


// delete route 
app.post('/delete', (req, res) => {
    let id = Number(req.body.id.trim()); // Convert to number after trimming
    console.table(submissions);
    console.log(`ID to delete: '${id}' (Type: ${typeof id})`);

    // Find the index of the submission with the given id
    const index = submissions.findIndex(submission => submission.id === id);
    console.log(`Position of item with id '${id}' is: ${index}`);
    
    if (index !== -1) {
        submissions = submissions.filter(submission => submission.id !== id); 
        console.log(`Deleted item with id: '${id}'`);
    } else {
        console.log(`Item with id '${id}' not found.`);
    }
    
    console.table(submissions);
    
    // Render the page with all submissions
    res.render("index.ejs", { 
        submissions: submissions
    });
});


// Add the edit route
app.get('/edit', (req, res) => {
    const id = req.query.id;
    const submission = submissions.find(sub => sub.id == id);
    res.render('index.ejs', { 
        submission: submission
    });
});

// Add the update route
app.post('/update', (req, res) => {
    const id = req.body.id;
    const issueAmount = req.body.issueAmount;
    const issueDate = req.body.issueDate;
    const obligor = req.body.obligor;

    const submissionIndex = submissions.findIndex(sub => sub.id == id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex] = { issueAmount, issueDate, obligor, id };
    }

    res.redirect('/');
});





app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});