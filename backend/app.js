const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const auth = require('./routes/auth');
const createtask = require('./routes/createtask');
const fetchtasks = require('./routes/fetchtasks');
const deletetask = require('./routes/deletetask');
const updatetask = require('./routes/updatetask');

app.use(express.json());
app.use(cors());
const connectDB = require("./db");

connectDB();

const UserDetails = require('./models/userDetails');
const TaskDetails =require('./models/taskDetails');

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(auth);
app.use(createtask);
app.use(fetchtasks);
app.use(deletetask);
app.use(updatetask);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
