/**
 * Users.js
 *
 * @description :: User object.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    userId: {
      type: "string"
    },
    username: {
      type: "string"
    },
    email: {
      type: "string"
    },
    firstName: {
      type: "string"
    },
    lastName: {
      type: "string"
    },
  },
  validationMessages: {
    userId: {
      unique: "Another user with the same id exists.",
      required: "The id attribute is required."
    },
  }
};
