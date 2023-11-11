import multer, { FileFilterCallback } from 'multer'

const storage = multer.diskStorage({
	destination(_req, _file, cb) {
		cb(null, "public/uploads");
	},
	filename(_req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const allowedTypes = ["text/plain", "text/html", "application/pdf"];

const fileFilter = (_req: unknown, file: any, cb: FileFilterCallback) => {
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

export default multer({ storage, fileFilter })
