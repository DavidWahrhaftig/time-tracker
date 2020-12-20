const   express     = require('express'),
        cors        = require('cors'),
        mongoose    = require('mongoose'),
        mongoURI    = require('./keys.js').mongoURI;
        app         = express();


// Form Data Middleware
app.use(express.urlencoded({
    extended: false
}));

// Json Body Middleware
app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI, 
    {   
        useFindAndModify: false,
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => {
        console.log(`Database connected successfully ${mongoURI}`);       
    }).catch((err) => {
        console.log(`Unable to connect with the database ${err}`)
    });

// Bring in the Tasks route
const tasks = require('./routes/api/tasks');
app.use('/api/tasks', tasks);
// Bring in the Times route
const times = require('./routes/api/times');
app.use('/api/times', times);
// Bring in the Times route
const projects = require('./routes/api/projects');
app.use('/api/projects', projects);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

