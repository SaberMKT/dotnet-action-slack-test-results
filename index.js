const core = require('@actions/core');
const github = require('@actions/github');
const parseString = require('xml2js').parseString;
const fs = require('fs');
const axios = require('axios');

try {
  const filepath = core.getInput('filepath');
  const slack_url = core.getInput('slack_url');
  var data = fs.readFileSync(filepath);
  parseString(data, (err, res) => {
    const data = res.TestRun.ResultSummary[0].Counters[0]['$']
    console.log(data);

    const total = data.total;
    const passed = data.passed;
    const failed = data.failed;

    axios
    .post(slack_url, {
      "channel":"#uqrew",
      "icon_emoji":":serega:",
      "username":"Uqrew Backend Builder",
      "text":`Test results:\n Total: ${total}. Passed: ${passed}. Failed: ${failed}`
    })
    .then(res => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log(res)
    })
    .catch(error => {
      console.error(error)
    })

    console.log(total);
  });

} catch (error) {
  core.setFailed(error);
}