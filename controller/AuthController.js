const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 11
const TOKEN_KEY = process.env.TOKEN_KEY || 'areallylonggoodkey'

//for JWT expiry
const today = new Date()
const exp = new Date(today)
exp.setDate(today.getDate() + 30)

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new User({
      name,
      email,
      password_digest
    })

    await user.save()

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000)
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    res.status(201).json({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select(
      'name email password_digest'
    )
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000)
      }

      const token = jwt.sign(payload, TOKEN_KEY)
      res.status(201).json({ token })
    } else {
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, TOKEN_KEY)
    if (payload) {
      res.json(payload)
    }
  } catch (error) {
    res.status(401).send('Not Authorized')
  }
}

module.exports = {
  signup,
  signin,
  verify
}
