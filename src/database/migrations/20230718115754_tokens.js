exports.up = function (knex) {
  console.log('Migration: TOKENS')

  //
  return knex.schema.createTable('tokens', function (table) {
    table.increments('id').primary()

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.string('token', 1024).notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('tokens')
}
