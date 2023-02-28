const express = require('express');
const studentRoutes = require('./src/student/routes');
const authRoutes = require('./src/student/authRoutes');
const config = require('./config/app');



const app = express();
const port = config.appPort;

const bodyParser = require('body-parser');


//middleware
app.use(bodyParser.json());


app.use('/api/v1/students' ,studentRoutes);
app.use('/api/v1/auth' ,authRoutes);

app.listen(port,()=>{
    console.log(`Server is working at ${port}`)
})