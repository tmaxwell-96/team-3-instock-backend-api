const knex = require('knex')(require('../knexfile'));

const searchWarehouseOrInventory = (endpoint, searchKeyword) =>{
    const tableName = endpoint === '/warehouses' ? 'warehouses' : 'inventories';
    const searchFields = endpoint === '/warehouses'
      ? ['warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_phone','contact_email' ]
      : ['item_name', 'warehouse_name', 'category', 'description'];

      let query = knex(tableName).select('*');

      if (tableName === 'inventories') {
        query = query
          .innerJoin('warehouses', 'inventories.warehouse_id', 'warehouses.id');
      }
  
    return query
      .where((builder) => {
        builder.orWhere(function () {
          for (const field of searchFields) {
            this.orWhere(field, 'like', `%${searchKeyword}%`);
          }
        });
      });
}
module.exports = {
    searchWarehouseOrInventory,
  };