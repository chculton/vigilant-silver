const express = require('express')
const { generateKeyPair } = require('crypto')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.use(express.json());

const RSA_PRIVATE_KEY = generateKeyPair( 'rsa', {
  modulusLength: 530,
  publicExponent: 0x10101,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'der'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'der',
    cipher: 'aes-192-cbc',
    passphrase: 'Test Authentication'
  }
}, (error, publicKey, privateKey) => {
  if(!error){
    return privateKey
  }
  else {
    console.log(error)
  }
})

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

const accessTokenSecret = 'youraccesstokensecret';

function getUser(email, password) {
  return users.find(u => { return u.email === email && u.password === password }).userId
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
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  if (email && password){
    // find user
    const userId = getUser(email, password)

    // generate token
    const jwtBeaerToken = jwt.sign({userId: userId}, accessTokenSecret);
    
    // respond
    res.cookie("SESSIONID", jwtBeaerToken, {httpOnly: true, secure: true});
    console.log("cookie created")
    res.send()
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