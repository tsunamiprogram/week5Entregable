const catchError = require('../utils/catchError');
const Director = require('../models/Director');

const create = catchError(async(req, res) => {
    const result = await Director
.create(req.body);
    return res.status(201).json(result);
});

const getAll = catchError(async(req, res) => {
    const results = await Director
.findAll();
    return res.json(results);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director
.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director
.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Director
.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}