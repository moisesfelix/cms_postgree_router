const Joi = require('joi');

// Middleware para validar o corpo da solicitação ao criar um novo usuário
const validateCreateUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        telefone: Joi.string().required(),
        coord_x: Joi.number().allow(null),
        coord_y: Joi.number().allow(null)
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = { validateCreateUser };
