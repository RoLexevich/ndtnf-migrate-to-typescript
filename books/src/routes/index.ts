import express from 'express'

const router = express.Router();

router.get("/", (_req, res) => {
	res.render("index", { title: "Главная" });
});

export { router as indexRouter }
