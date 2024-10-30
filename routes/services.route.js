const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  GetAll,
  Create,
  Update,
  Delete,
  GetAllServiceNames,
} = require("../controllers/services.controller");

function removeExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return filename;
  }

  return filename.substring(0, lastDotIndex);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(
      "uploads",
      removeExtension(file.originalname)
    );
    fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original file name
  },
});
const upload = multer({ storage });

router.route("/").get(GetAll).post(upload.array("container"), Create);
router.route("/:id").put(upload.single("container"), Update).delete(Delete);
router.route("/names").get(GetAllServiceNames);

module.exports = router;
