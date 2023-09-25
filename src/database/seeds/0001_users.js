require('dotenv').config()

const { roles } = require('../../middlewares/roles')
const { hashSync } = require('bcrypt')
const { getRandomSalt } = require('../../utils/security')

//
exports.seed = async function (knex) {
  console.log('Seed: USERS')

  if (await knex.select('id').from('users').first()) {
    console.log(' - ABORTED: Table has already being populated')
    return
  }

  const salt = getRandomSalt()
  await knex('users').insert([
    {
      name: 'Root',
      surname: 'Root',
      username: 'root',
      password: hashSync('root', salt),
      salt,
      email: 'email@email.com',
      phone: '(55) 55555-5555',
      role: roles.ROOT
    }
  ])
}
