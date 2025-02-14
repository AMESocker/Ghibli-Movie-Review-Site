const path = require('path');
const express = require('express');
const routes = require("./controllers");
const session = require('express-session');
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//----Session Storage----
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 2*60*60*1000
  },
  resave: false,
  saveUninitialized: true,
  store : new SequelizeStore({
    db:sequelize
  })
};

app.use(session(sess));


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//get to our controller routes
app.use(routes);

// Start the server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
});

//put into .env if needed: JAWSDB_URL='mysql://abec58g5wbufie13:gx929roht4t2edut@migae5o25m2psr4q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/e5yg48m9itqa2gxv'
