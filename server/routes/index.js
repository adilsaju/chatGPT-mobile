var express = require('express');
var router = express.Router();
const config = require("../config.json")
const cors = require("cors")
const {
  spawn
} = require('child_process');

// Declare a global variable to store the pythonProcess object
let pythonProcess;
console.log("reset");

router.use(cors())

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("hello");
  res.json("ab")
});

router.get('/test', function (req, res, next) {
  console.log("hello");
});

router.post('/connection', function (req, res, next) {

  const command = 'python3';
  const args = ['bin/initialize.py'];

   pythonProcess = spawn(command, args, {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
  });
  // pythonProcess.stdin.write('kuku\n');

  // Listen for output from the second Python process
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output 1: ${data}`);
  });

  // Handle errors and exit events
  pythonProcess.on('error', (error) => {
    console.error(`Error starting Python script: ${error}`);
  });

  pythonProcess.on('exit', (code) => {
    console.log(`Python script exited with code ${code}`);
  });

  res.json("initialize success")
});

router.post('/message', function (req, res, next) {
  if (pythonProcess) {
    pythonProcess.stdin.write(req.body.input+'\n');

    // Listen for output from the second Python process
    const onDataPromise = new Promise((resolve, reject) => {
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
        resolve(data);
      });
      pythonProcess.stdout.on('error', (err) => {
        reject(err);
      });
    });

    onDataPromise.then((data) => {
      res.json({ output: data.toString() });
    }).catch((err) => {
      console.error(`Error receiving data from Python script: ${err}`);
      res.status(500).json({ error: err.toString() });
    });
  }
  else
  {
    res.status(500).json({ error: "initialize first" });
  }
});


module.exports = router;