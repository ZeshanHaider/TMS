const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const mongoURI = 'mongodb+srv://mzhaider208:OfNcccRF0guvl6Kq@mongo.pqtxyfn.mongodb.net/?retryWrites=true&w=majority&appName=mongo';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true
  },
  duedate: {
    type: String,
    required: true
  },
});

const Data = mongoose.model('Data', DataSchema);

app.post('/add', (req, res) => {
  console.log('Received data:', req.body); 
  const newData = new Data({
    name: req.body.name,
    details: req.body.details,
    duedate: req.body.duedate
  });

  newData.save()
    .then(item => res.json(item))
    .catch(err => {
      console.error('Error saving data:', err);
      res.status(400).json('Error: ' + err);
    });
});

app.get('/tasks', async (req, res) => {
  try {
      const tasks = await Data.find();
      res.json(tasks);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  console.log(`Attempting to delete task with id: ${req.params.id}`);
  try {
    const task = await Data.findByIdAndDelete(req.params.id);
    if (!task) {
      console.error(`Task with id ${req.params.id} not found`);
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(`Error deleting task with id ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
