

const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {

  const author = req.headers.authorization
  if (author) {
    try {
      const token = author.split(' ')[1]
      const decodedAuthor = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decodedAuthor
      next()
    } catch (error) {
      return res.status(401).json({ message: 'invaild token ' })
    }
  }
  else {
    return res.status(401).json({ message: 'no token provider' })
  }

}


function verifyTokenAndAdmin(req, res, next) {

  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    }

    else {
      return res.status(403).json({ message: 'not allowed, only admins' })
    }


  })

}


function verifyTokenAndUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next()
    }
    else {
      return res.status(403).json({ message: 'not allowed, only user himself' })
    }
  })
}


function verifyTokenAndAdminAndUser(req, res, next) {

  verifyToken(req, res, () => {

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    }
    else {
      return res.status(403).json({ message: 'not allowed, only admin and user himself' })
    }

  })
}



module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndAdminAndUser
}