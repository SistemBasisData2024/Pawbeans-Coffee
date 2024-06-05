const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const coffeeRoutes = require('./routes/coffeeRoutes');
const myOrderRoutes = require('./routes/myOrderRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/coffee', coffeeRoutes);
app.use('/cart', cartRoutes);
app.use('/myOrder', myOrderRoutes);


app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

