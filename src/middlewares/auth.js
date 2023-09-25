const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: 'users.authentication.required'
    })
  }

  try {
    req.user = jwt.verify(authorization, process.env.TOKEN_SECRET)
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        success: false,
        expired: true,
        message: 'users.authentication.expired'
      })
    }

    return res.status(401).send({
      success: false,
      message: 'users.authentication.fail'
    })
  }

  next()
}
