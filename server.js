import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './dbCards.js';


//  App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://surfruit:98Nazarko@cluster0.i0hj9.mongodb.net/tinder-clone?retryWrites=true&w=majority'
// Middlewares
app.use(express.json());
app.use(Cors());
// DB
mongoose.connect(connection_url, {
    useNewUrlParser: true, // <-- no longer necessary
    useUnifiedTopology: true //
})
// API
app.get('/', (req,res) => res.status(200).send("Hello clever programmers!"));

app.post('/tinder/card', (req, res) =>{
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) =>{
        if (err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards', (reg, res) =>{
    Cards.find((err, data) =>{
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));