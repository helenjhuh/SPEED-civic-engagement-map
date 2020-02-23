// projects-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = "projects";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const { Types } = Schema;
  const schema = new Schema(
    {
      verified: { type: Boolean, default: false },
      featured: { type: Boolean, default: false },
      name: { type: String, required: true },
      description: { type: String, required: true },
      types: [{ type: String, default: undefined }],
      issues: [{ type: String, default: undefined }],
      langGrants: [{ type: String, default: undefined }],
      communityPartners: [{ type: String, default: undefined }],
      funders: [{ type: String, default: undefined }],
      beneficiaries: { type: Number },
      website: { type: String },
      owner: { type: Types.ObjectId, ref: "users" },
      address: { type: Types.ObjectId, ref: "addresses" },
      pins: [{ type: Types.ObjectId, ref: "pins", default: undefined }],
      photos: [{ type: Types.ObjectId, ref: "photos", default: undefined }]
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
