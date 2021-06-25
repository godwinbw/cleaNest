const { parentPort } = require("worker_threads");

// this is the function that will be executed when the job runs
async () => {
  console.log("...BREE creating monthly tasks!");

  // signal to the parent that the job is done
  if (parentPort) {
    parentPort.postMessage("...creating monthly tasks DONE!");
  } else {
    process.exit(0);
  }
};
