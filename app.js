const express =require('express');
const bodyParser = require('body-parser');

const session = require('express-session');

 const sequelize = require('./database');
 const userRouter =  require('./routes/UserRoutes.js');
 const chatbotRouter = require('./routes/ChatbotRoute.js');
 const conversationRouter= require( './routes/ConversationRoutes.js');
 const endUserRouter = require('./routes/EndUserRoutes.js');
 const passport = require('./passport.js');
 const passport1 = require('passport');
 sequelize.sync().then(()=>{console.log('db is ready')});

const { json } = bodyParser;

const app = express();
app.use(session({
    secret: "SiddharthJain1234",
    resave: false,
    saveUninitialized: false
  }));  
app.use(passport1.initialize());
app.use(passport1.session());

app.use(express.json());
app.use(userRouter);
app.use(chatbotRouter);
app.use(conversationRouter);
app.use(endUserRouter);
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});