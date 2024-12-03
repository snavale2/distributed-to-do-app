const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    status: { type: Boolean, default: false },
    lastModified: { type: Date, default: Date.now },
    version: { type: Number,  default: 1 }
});

// Middleware to always set timestamp to current time
taskSchema.pre('save', function (next) {
    this.lastModified = Date.now();
    next();
});

taskSchema.pre('findOneAndUpdate', function (next) {
    this._update.lastModified = Date.now();
    next();
});

module.exports = mongoose.model('Task', taskSchema);
