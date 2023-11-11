import express from 'express'
import path from 'path'
import { BooksRepository } from '../../BooksRepository'
import { container } from '../../container'
import fileMiddleware from '../../middleware/file'
import { IBook } from '../../types'

const router = express.Router()

const props = [
    'title',
    'description',
    'authors',
    'favorite',
    'fileCover',
    'fileName',
] as const;

router.get('/', async (_req, res) => {
    const repo = container.get(BooksRepository);
    const books = await repo.getBooks();

    res.status(200).json(books);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(id);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('not found');
    }
});

router.post('/', fileMiddleware.single('fileBook'), async (req, res) => {
    const newBook = {} as IBook;

    const { body, file } = req;

    props.forEach((p) => {
        if (body[p] !== undefined) {
            newBook[p] = body[p];
        }
    });

    if (file) {
        newBook.fileBook = file.path;
    }

    try {
        const repo = container.get(BooksRepository);
        const book = await repo.createBook(newBook);

        await book.save();

        res.status(201).json(book);
    } catch (e) {
        console.error(e);
    }
});

router.put('/:id', fileMiddleware.single('fileBook'), async (req, res) => {
    const { id } = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(id);

    if (book) {
        const { body, file } = req;

        props.forEach((p) => {
            if (body[p] !== undefined) {
                book[p] = body[p];
            }
        });

        if (file) {
            book.fileBook = file.path;
        }

        res.status(200).json(book);
    } else {
        res.status(404).send('not found');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const repo = container.get(BooksRepository);
        await repo.deleteBook(id);

        res.status(200).send('ok');
    } catch (e) {
        console.error(e);
        res.status(404).send('not found');
    }
});

router.get('/:id/download', async (req, res) => {
    const { id } = req.params;
    const repo = container.get(BooksRepository);
    const book = await repo.getBook(id);

    if (book) {
        res.download(path.join(__dirname, '../..', book.fileBook), (err) => {
            if (err) {
                res.status(404).send('not found');
            }
        });
    } else {
        res.status(404).send('not found');
    }
});

export { router as booksApiRouter }
