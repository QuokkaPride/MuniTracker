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
    console.table(submissions);

    // Render the page with all submissions
    res.render("index.ejs", { 
        submissions: submissions
    });
});


// delete route 
app.post('/delete', (req, res) => {
    let id = Number(req.body.id); // Convert to number. form data come in as strings.
    console.table(submissions);
    console.log(`target id: '${id}'`);

    submissions = submissions.filter(submission => submission.id !== id); 
    console.log(`Deleted item with id: '${id}'`);
    console.table(submissions);
    
    // Render the page with all submissions
    res.redirect('/');
});


// Add the edit route
app.get('/edit', (req, res) => {
    let id = Number(req.query.id);
    let editSubmission = submissions.find(sub => sub.id == id);
    res.render('index.ejs', { 
        editSubmission: editSubmission
    });
});

// Add the update route
app.post('/update', (req, res) => {
    let id = Number(req.body.id);
    let issueAmount = req.body.issueAmount;
    let issueDate = req.body.issueDate;
    let obligor = req.body.obligor;

    const submissionIndex = submissions.findIndex(sub => sub.id == id);
    if (submissionIndex !== -1) {
        submissions[submissionIndex] = { issueAmount, issueDate, obligor, id };
    }

    res.redirect('/');
});





app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});