const cors = require('cors');
const express = require('express');
const mongoose = require ('mongoose');
const config = require('./common/config.js');
const productsRouter = require('./routes/products.routes.js');
const usersRouter = require('./routes/users.routes.js');
const categorysRouter = require('./routes/category.routes.js')
const userEdit = require('./routes/userEdit.routes.js') 


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' })); 

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categorysRouter);
app.use('/api/userEdit', userEdit);

app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URL);
    console.log(`API activa puerto ${config.PORT}, conectada a ${config.MONGODB_URL}`);
});
