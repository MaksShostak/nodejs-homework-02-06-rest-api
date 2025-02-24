const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");
const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 1048576 },
});
const avatarMiddleware = multer({ storage: multerConfig });

module.exports = avatarMiddleware;
