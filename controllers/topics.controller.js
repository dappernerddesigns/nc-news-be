const { fetchTopics } = require("../models/topics.model.js");

exports.getTopics = async (req, res) => {
    const topics = await fetchTopics();
    return res.send({ topics });
};
