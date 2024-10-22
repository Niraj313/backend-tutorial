const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define person Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

// Create Person model

personSchema.pre('save', async function (next) {
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) return next();

    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash Password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override th plain password with the hashes one
        person.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // the bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}


const Person = mongoose.model('Person', personSchema);
module.exports = Person;


