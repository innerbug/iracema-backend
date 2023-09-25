exports.up = function (knex) {
  console.log('Migration: USERS')

  //
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()

    table.string('name', 300).notNullable()
    table.string('surname', 300)

    table.string('username', 100).unique().notNullable()
    table.string('password', 500).notNullable()
    table.integer('salt').notNullable()

    table.string('email', 500).unique().notNullable()
    table.string('phone', 50)

    table
      .enu('role', ['ROOT', 'ADMIN', 'OPERATIONAL', 'COMMERCIAL', 'VIEWER'])
      .notNullable()
      .defaultTo('VIEWER')

    table.boolean('active').notNullable().defaultTo(true)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
