const roles = {
  ROOT: 'ROOT',
  ADMIN: 'ADMIN',
  TYPE1: 'TYPE1',
  TYPE2: 'TYPE2',
  TYPE3: 'TYPE3'
}

const permissions = (permissions) => {
  return (req, res, next) => {
    if (!permissions.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: 'user.permission.denied'
      })
    }

    next()
  }
}

module.exports = { roles, permissions }
