// Import in token package
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhhhh';
const expiration = '2h';

//Export module
module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // separate them and use tokenvalue: ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim()
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
   return(req);
  },
};