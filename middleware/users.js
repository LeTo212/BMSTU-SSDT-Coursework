module.exports = {
  validateRegister: (req, res, next) => {
    // username min length 4
    if (!req.body.email || req.body.email.length < 4) {
      return res.status(400).send({
        msg: "Please enter a email with min. 4 chars",
      });
    }
    // password min 8 chars
    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).send({
        msg: "Please enter a password with min. 8 chars",
      });
    }
    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: "Both passwords must match",
      });
    }
    next();
  },
};
