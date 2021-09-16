//Modules
const router = require("express").Router();

//Models
const News = require("./news.model.js");
const Author = require("../Author/author.model.js");

//Request Handlers
router.get("/news", async (req, res) => {
    try {
        const _id = req.query.id
        const filter = req.query.filter
        let newsList;
        if(_id) {
            newsList = await News.findOne({_id});
            newsList.author = (await Author.findOne({ _id: newsList.author }).select("name")).name;
            await News.findOneAndUpdate({_id}, {$inc:{views:1}})
        } else if(filter!="all" && filter){
            newsList = await News.find({category:filter});
        } else {
            newsList = await News.find();
        }
        res.status(200).json({ message: "News Load Success", newsList });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;