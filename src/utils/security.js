require('dotenv').config

function getRandomSalt() {
  const max = Number(process.env.MAX_SALT)
  const min = Number(process.env.MIN_SALT)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = { getRandomSalt }
