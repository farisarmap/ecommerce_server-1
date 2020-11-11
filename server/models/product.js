'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Name must not null'
        },
        notEmpty: {
          args: true,
          msg: 'Name must is required'
        }
      }
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'Image Url must not null'
        },
        notEmpty: {
          args: true,
          msg: 'Image Url must not empty'
        }
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'Price must not null'
        },
        notEmpty: {
          args: true,
          msg: 'Price must not empty'
        },
        isNumeric: {
          args: true,
          msg: 'Invalid number format'
        }
      }
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          args: true,
          msg: 'Stock must not null'
        },
        notEmpty: {
          args: true,
          msg: 'Stock must not empty'
        },
        isNumeric: {
          args: true,
          msg: 'Invalid stock format'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};