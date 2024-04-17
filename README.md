# Library for my-mc.link api
Just a simple library that lets you work with my-mc.link API

How to use:
```javascript
const myMcLink = new MyMCLib("API_KEY_HERE");

// Will print information about API key expiration date
console.log(await myMcLink.getTime()); 

// Will start the server
myMcLink.startServer();
```

Credits for just cool & fun service as my-mc.link goes to SNXRaven