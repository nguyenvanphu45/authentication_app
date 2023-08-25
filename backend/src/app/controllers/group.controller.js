const groupService = require('../services/group.service');

const groupController = {
    // [GET] /group/
    fetchGroup: async (req, res) => {
        try {
            let response = await groupService.fetchGroup(req.user.id);
            res.status(200).json(response);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join('');
                return res.status(500).json({ msg: err });
            }
            res.status(500).json({ msg: error.message });
        }
    },

    // [POST] /group/create
    create: async (req, res) => {
        try {
            let data = req.body;
            let response = await groupService.create(data, req.user);

            res.status(200).json(response);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join('');
                return res.status(500).json({ msg: err });
            }
            res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = groupController;
