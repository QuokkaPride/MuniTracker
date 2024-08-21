import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let submissions = []; // Array to store submitted data

app.get('/', (req, res) => {
    res.render('index.ejs', {
        submissions: submissions
    });
});

app.post("/submit", (req, res) => {
    const issueAmount = req.body.issueAmount;
    const issueDate = req.body.issueDate;
    const obligor = req.body.obligor;
    const id = Date.now(); // Generate a simple unique ID for demonstration
    
    // Add the new submission to the array
    submissions.push({ issueAmount, issueDate, obligor, id });
    
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

// 
app.post('/delete', (req, res) => {
    const id = req.body.id;
    submissions = submissions.filter(submission => submission.id !== id);
    console.log(`Deleted item with id: ${id}`);
    res.redirect('/'); // Redirect after deletion
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});