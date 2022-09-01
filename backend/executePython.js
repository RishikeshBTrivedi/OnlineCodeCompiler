// Python is an interpreted(not compiled) language threrfore the code will be different from executeCpp
const { exec } = require("child_process");
//python would write file and execute as opposed to writing file then compiling then execution
//therefore python code would give output faster but reality is different
const executePython = (filepath) => {
//   const jobId = path.basename(filepath).split(".")[0];
    return new Promise((resolve, reject) => {
    exec(
      `python ${filepath}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executePython,
};