let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Order Model
let orderSchema = require('../models/Order');

// CREATE Order
router.post('/create-order', (req, res, next) => {
  orderSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Orders
router.get('/', (req, res) => {
  orderSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// UPDATE order
router
  .route('/update-order/:id')
  // Get Single Order
  .get((req, res) => {
    orderSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })

  // Update Order Data
  .put((req, res, next) => {
    orderSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (error, data) => {
        if (error) {
          return next(error);
          console.log(error);
        } else {
          res.json(data);
          console.log('Order updated successfully !');
        }
      }
    );
  });

// Delete Order
router.delete('/delete-order/:id', (req, res, next) => {
  orderSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
