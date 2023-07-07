const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get(`/`, (req, res) => {
    const { userId, name, pinchi, birthday, sex, tip, get_date } = req.query;
    res.send({ code: 200, data: {} });
});

module.exports = router;
