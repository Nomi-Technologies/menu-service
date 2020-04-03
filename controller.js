const db = require("./models");
const Dish = db.Dish;

const createDish = (req, res) => {
  const dish = {
    name: req.body.name
  }

  Dish.create(dish)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while processing this request"
      });
    });
};

const dishesList = (req, res) => {
  Dish.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting dishes list"
      });
    });
};

const getDish = (req, res) => {
  const id = req.params.id;

  Dish.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occured while getting dish with id=" + id
      });
    });
};

const updateDish = (req, res) => {
  Dish.update(req.body,
  {
    where: {
      id: req.params.id
    }
  })
  .then(res.send({
    message: "Dish id=" + req.params.id + " updated successfully"
  }))
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while updating dish with id=" + id
    });
  });
};

const deleteDish = (req, res) => {
  Dish.destroy({
    where: {id: id}
  })
  .then(res.send({
    message: "Dish was deleted successfully"
  }))
  .catch(err => {
    res.status(500).send({
      message: err.message || "An error occured while deleting     dish with id=" + id
    });
  });
};

module.exports = {
  createDish,
  dishesList,
  getDish,
  updateDish,
  deleteDish
}