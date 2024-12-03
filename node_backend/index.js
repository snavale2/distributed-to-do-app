const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const Task = require('./models/Task');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow requests from any origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors()); // Enable CORS for Express
app.use(express.json());

// REST APIs
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const { taskName, status, version } = req.body;
    const task = new Task({ taskName, status, version });
    await task.save();
    io.emit('task-updated', { type: 'ADD', task });
    res.json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
    const { taskName, status, version } = req.body;
    // console.log(req.params.id);
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        { taskName, status, version },
        { new: true }
    );
    io.emit('task-updated', { type: 'UPDATE', task });
    res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    io.emit('task-updated', { type: 'DELETE', id: req.params.id });
    res.status(204).send();
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => console.log('A user disconnected'));
});

server.listen(8080, () => console.log('Server listening on http://localhost:8080'));
