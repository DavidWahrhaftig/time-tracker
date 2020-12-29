const   express     = require('express'),
        cors        = require('cors'),
        mongoose    = require('mongoose'),
        mongoURI    = require('./keys.js').mongoURI;
        app         = express();

const Project = require('./model/Project');

// Form Data Middleware
app.use(express.urlencoded({
    extended: false
}));

// Json Body Middleware
app.use(express.json());
app.use(cors());


// mongoDB database connection
mongoose.connect(mongoURI, 
    {   
        useFindAndModify: false,
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(async () => {
        console.log(`Database connected successfully ${mongoURI}`);
        const exist = await Project.findOne({name: 'No Project'});
        if (!exist) {  
            // initialy have a No Project document 
            await Project.create({name: 'No Project'});
            console.log('[app.js] created "No Project" project')
        }
    }).catch((err) => {
        console.log(`Unable to connect with the database ${err}`)
    });

// Bring in the Tasks route
const tasks = require('./routes/api/tasks');
app.use('/api/tasks', tasks);

// Bring in the Projects route
const projects = require('./routes/api/projects');
app.use('/api/projects', projects);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

