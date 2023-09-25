const knex = require('../database')
const jwt = require('jsonwebtoken')

const { compareSync } = require('bcrypt')

module.exports = {
  // REGISTER
  async register(req, res) {
    try {
      const { username, password } = req.body

      const user = await knex
        .select('id', 'name', 'surname', 'password', 'role')
        .from('users')
        .where('username', username)
        .first()

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'user.registration.notfound'
        })
      }

      if (compareSync(password, user.password)) {
        const payload = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          role: user.role
        }

        // TOKEN
        const token = jwt.sign({ ...payload }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_LIFE
        })

        // REFRESH TOKEN
        const refresh_token = jwt.sign(
          { ...payload },
          process.env.REFRESH_SECRET,
          { expiresIn: process.env.REFRESH_LIFE }
        )

        await knex('tokens').where({ user_id: user.id }).del()
        await knex('tokens').insert({
          user_id: user.id,
          token: refresh_token
        })

        return res.json({
          success: true,
          token,
          refresh_token,
          message: 'user.registration.ok'
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'user.registration.nok'
        })
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'user.registration.error',
        detail: {
          code: err.code,
          message: err.detail,
          constraint: err.constraint,
          type: typeof err
        }
      })
    }
  },

  // REFRESH
  async refresh(req, res) {
    try {
      const { refresh_token } = req.body

      let token = await knex
        .select()
        .from('tokens')
        .where({ token: refresh_token })
        .first()

      if (token) {
        const _ = jwt.verify(token.token, process.env.REFRESH_SECRET)
        const decoded = jwt.decode(token.token)

        const payload = {
          id: decoded.id,
          name: decoded.name,
          surname: decoded.surname,
          role: decoded.role
        }

        // TOKEN
        token = jwt.sign({ ...payload }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_LIFE
        })

        return res.json({
          success: true,
          token,
          refresh_token,
          message: 'user.refresh.ok'
        })
      } else {
        return res.json({
          success: false,
          message: 'user.refresh.nok'
        })
      }
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
          success: false,
          message: 'user.refresh.expired'
        })
      }

      return res.status(400).json({
        success: false,
        message: 'user.refresh.error'
      })
    }
  },

  // DELETE
  async delete(req, res) {
    const { refresh_token } = req.body

    try {
      await knex('tokens').where({ token: refresh_token }).del()

      return res.status(200).send({
        success: true,
        message: 'user.registration.delete.ok'
      })
    } catch (err) {
      // return res.status(400).send({
      //   success: false,
      //   message: 'user.registration.delete.nok'
      // })
    }

    return res.status(200).send({
      success: true,
      message: 'user.registration.delete.ok'
    })
  }
}
