// pins-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function(app) {
  const modelName = 'pins';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const { Types } = Schema;
  const schema = new Schema(
    {
      address: { type: Types.ObjectId, ref: 'addresses' },
      description: { types: Types.String }
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
