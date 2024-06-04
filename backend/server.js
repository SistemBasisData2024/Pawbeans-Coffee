const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const coffeeRoutes = require('./routes/coffeeRoutes'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/api', coffeeRoutes); 

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

