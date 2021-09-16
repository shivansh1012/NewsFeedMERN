//Modules
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//Models
const Author = require("./author.model.js");
const News = require("../News/news.model.js");

//Authorization
const authorAuth = require("./author.auth.js");

//Request Handlers
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Please enter all fields" });
        if (password.length < 6)
            return res.status(400).json({ message: "Please enter password of length more than 6 chars" });

        const existingAuthor = await Author.findOne({ email: email });

        if (existingAuthor)
            return res.status(200).json({ message: "User already exists" });

        const newAuthor = new Author({
            name,
            email,
            password
        });

        await newAuthor.save();

        res.status(200).json({ message: "Author Registration Success" });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Please enter all fields" });

        const existingAuthor = await Author.findOne({ email: email });

        if (!existingAuthor)
            return res.status(401).json({ message: "Invalid email or password" });

        const authorToken = jwt.sign({
            _id: existingAuthor._id,
            name: existingAuthor.name,
            email: existingAuthor.email
        }, process.env.JWT_SECRET);

        res.status(200)
            .cookie("authorToken", authorToken, { httpOnly: true })
            .json({ message: "Login Success" });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/news", authorAuth, async (req, res) => {
    try {
        const author = req.authorInfo["_id"];

        const authorDetails = await Author.findOne({ _id: author });
        let newsList = [];
        for (const article of authorDetails.articles) {
            const newsDetails = await News.findOne({ _id: article });
            newsList.push(newsDetails);
        }
        res.status(200).json({ newsList: newsList });
    } catch (error) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/news", authorAuth, async (req, res) => {
    try {
        const { title, category, tags, body } = req.body;
        const author = req.authorInfo["_id"];

        const newNews = new News({
            title,
            category,
            tags,
            body,
            author
        })

        const savedNews = await newNews.save();

        await Author.findOneAndUpdate(
            { _id: author },
            { $push: { articles: savedNews._id } }
        )

        res.status(200).json({ message: "News Upload Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.patch("/news", authorAuth, async (req, res) => {
    try {
        const { _id, title, category, tags, body } = req.body;

        await News.findOneAndUpdate(
            { _id: _id },
            {
                title,
                category,
                tags,
                body
            }
        )

        res.status(200).json({ message: "News Update Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/logout", (req, res) => {
    res.cookie("authorToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", authorAuth, (req, res) => {
    const { name, email } = req.authorInfo;

    return res.json({
        authorized: true,
        message: "Success",
        name,
        email
    }).status(200);
});

module.exports = router;