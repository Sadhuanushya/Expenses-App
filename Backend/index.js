const express = require('express');
//read the contents of the .env file and it to process.env
require('dotenv').config();
const cors =require('cors')

const port = 3080;
const app = express();
app.use(express.json());
app.use(cors())
const configureDB = require('./config/db.js');
configureDB();
const categoryctrl =require('./app/controllers/category-controllers')
const userCtlr = require('./app/controllers/user-controller');
const expenseCtrl=require('./app/controllers/expense-controller')
const authenticateUser=require('./app/middlewares/authenticate');
const authorizeUser=require('./app/middlewares/authorizeUser')

app.post('/users/register', userCtlr.register);
app.post('/users/login', userCtlr.login);

//creating protected route
app.get('/users',authenticateUser,authorizeUser(['Admin','moderator']),userCtlr.list)
app.delete('/users/:id',authenticateUser,authorizeUser(['Admin']),userCtlr.remove)
app.put('/users/update',authenticateUser,userCtlr.update)
app.get('/users/account',authenticateUser,userCtlr.account)
//category
app.post('/category',authenticateUser,categoryctrl.create)
app.get('/categories',authenticateUser,categoryctrl.list)
app.delete('/category/:id',authenticateUser,categoryctrl.delete)
app.put('/category/:id',authenticateUser,categoryctrl.update)
//expense
app.post('/expense',authenticateUser,expenseCtrl.create);
app.put('/expense/:id',authenticateUser,expenseCtrl.update);
app.delete('/expense/:id',authenticateUser,expenseCtrl.remove);
app.get('/expenses',authenticateUser,expenseCtrl.list);//,authorizeUser(['Admin','user'])
app.get('/expense/:id',authenticateUser,expenseCtrl.show)
app.listen(port, () => {
    console.log('server is running on port', port)
});
