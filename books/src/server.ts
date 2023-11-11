import express from 'express'
import mongoose from 'mongoose'
import errorMiddleware from './middleware/error'
import { booksApiRouter } from './routes/api/books'
import { userApiRouter } from './routes/api/user'
import { booksRouter } from './routes/books'
import { indexRouter } from './routes/index'

const app = express();

app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/user", userApiRouter);
app.use("/api/books", booksApiRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const dbName = process.env.DB_NAME || "book_service";

async function start() {
	try {
		const UrlDb = `mongodb://mongo:27017/${dbName}`;
		await mongoose.connect(UrlDb);

		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	} catch (e) {
		console.log(e);
	}
}

start();