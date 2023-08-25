const usersService = require('../services/users.service');

const usersController = {
    // [GET] /users/search
    findUserByKeyword: async (req, res) => {
        try {
            let keyword = req.query.search
                ? {
                    $or: [
                        { name: { $regex: req.query.search, $options: 'i' } },
                        { email: { $regex: req.query.search, $options: 'i' } },
                    ],
                  }
                : {};
            let response = await usersService.findUserByKeyword(keyword, req.user.id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },

    // [GET] /users/:id
    fineOne: async (req, res) => {
        try {
            let response = await usersService.findOne(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },

    // [PUT] /users/edit/:id
    update: async (req, res) => {
        try {
            let id = req.params.id;
            let data = req.body;
            let response = await usersService.update(id, data);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = usersController;
