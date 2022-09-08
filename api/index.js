const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.use(express.json());

users = [
  { userId: '1', email: "t@t.t", password: "t"},
  { userId: '2', email: "test@example.com", password: "long-password-with-number-8"},
  { userId: '3', email: "mbigdog@gmail.com", password: "these-should-be-salted-and-hashed!"}
]

employees = [
  { userId: '1', name: "Tony"},
  { userId: '2', name: "Carla"},
  { userId: '3', name: "Matt"}
]

const accessTokenSecret = 'tempaccesstoken';

function getUser(email, password) {
  const foundUser = users.find(u => { return u.email === email && u.password === password })
  if (foundUser) {
    return foundUser.userId
  }
  else {
    return null
  }
}

function getUserDetails(userId) {
  return employees.find(u => { return u.userId === userId})
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.post('/login', (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    // find user
    const userId = getUser(email, password)
    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const user = getUserDetails(userId)

    // generate token
    const jwtBeaerToken = jwt.sign({userId: userId}, accessTokenSecret);
    
    // respond
    res.cookie("SESSIONID", jwtBeaerToken, {httpOnly: true, secure: true});
    res.cookie("USER", {user: user}, {httpOnly: true, secure: true})
    console.log("cookie created")
    res.send({user: user})
  }
  else {
    res.sendStatus(401);
  }
})

app.get('/employees', authenticateJWT, (req, res) => {
  res.json(employees);
});

app.listen(port, () => {
  console.log(`Portal API listening on port ${port}`)
})