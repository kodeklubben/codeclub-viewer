/* eslint-env node */

// This script uses SSH to find the current github user's fork of kodeklubben/beta.
// If it cannot access github via ssh, or there is no fork, it will return with an error.
// E.g. if the current user is coolGithubUser, then this script will return coolGithubUser/beta
// if coolGithubUser is authenticated via ssh to github, and this user has forked kodeklubben/beta.

const https = require('https');
const { execSync } = require('child_process');

const getForks = (username, json) => {
  const lookingForFork = username + '/beta';
  for (const fork of json) {
    const full_name = fork.full_name;
    if (full_name === lookingForFork) {
      console.log(full_name);
      process.exit(0); // Successfully found fork
    }
  }
  console.error('Could not find fork ' + lookingForFork);
  console.error('Please log into github with user "' + username + '" and make a fork of kodeklubben/beta');
  process.exit(1);
};

// Get github user name.
// The ssh-command will exit with error code 1, so run ssh in a subshell $(...) and
// echo result to avoid having execSync throwing an error.
const sshOutput = execSync('echo $(ssh -T -o StrictHostKeyChecking=no git@github.com 2>&1)').toString().trim();
const match = sshOutput.match(/^Hi ([^!]+)!/);
if (match == null) {
  console.error('ERROR: Could not find git username. Perhaps SSH authentication missing?');
  console.error('SSH output:');
  console.error(sshOutput);
  process.exit(1);
}

const githubUsername = match[1];
if (!githubUsername) {
  console.error('ERROR: Could not find git username.');
  process.exit(1);
}

// Get beta fork
https.get({
  hostname: 'api.github.com',
  path: '/repos/kodeklubben/beta/forks',
  headers: {'user-agent': githubUsername},
}, (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed. Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      getForks(githubUsername, parsedData);
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
  process.exit(1);
});
