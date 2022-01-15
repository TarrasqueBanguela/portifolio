
exports.up = function(knex, Promise) {
  return knex.schema.createTable('windows', table => {
      table.increments('id').primary()
      table.string('name').notNull()
      table.string('imgScr').notNull().unique()
      table.string('link').notNull().unique()
      table.string('content').notNull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('windows')
};
