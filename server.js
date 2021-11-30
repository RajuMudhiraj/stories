require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')


// Connecting to mongodb atlas
try {
    const mongoAtlasUri = "mongodb+srv://" + process.env.MONGO_ATLAS_USER + ":" + process.env.MONGO_ATLAS_PWD + "@cluster0.anqmb.mongodb.net/stories?retryWrites=true&w=majority";
    mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to mongodb atlas'));
}
catch (err) {
    console.log(err + ' couldn\'t connect to database')
}

// Home Route
app.get('/', (req, res) => {
    res.status(200).json({ Message: "Welcome to Instagram Stories." })
})


app.listen(process.env.PORT, () => {
    console.log(`Server is up and running on PORT ${process.env.PORT}`)
})

