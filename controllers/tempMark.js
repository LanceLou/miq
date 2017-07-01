const httpExample = () => {
  const querystring = {};
  const config = {};
  const code = '';
  const postData = querystring.stringify({
    code,
    client_id: config.GHCLIENT_ID,
    client_secret: config.GHCLIENT_SECRET_ID,
  });
  console.log(postData);
  const options = {
    hostname: 'www.github.com',
    port: 443,
    path: '/login/oauth/access_token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      accept: 'application/json',
    },
  };
  const req = Https.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', (data) => {
      console.log('data-gettting');
      console.log(data);
    });
  });
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
};

module.exports = {
  httpExample,
};
