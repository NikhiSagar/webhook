exports.execute = async function (event, context) {
  // Get the input arguments from the journey
  const inputArgs = event.inArguments[0];

  // Set up the options for the HTTP request
  const options = {
    hostname: 'webhook.example.com',
    path: '/path/to/webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Create a new request object
  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  // Handle errors
  req.on('error', (error) => {
    console.error(error);
  });

  // Send the payload to the webhook
  req.write(JSON.stringify(inputArgs));
  req.end();

  // Return the result of the activity execution
  return { status: 'ok' };
};
