const Service = require("../models/service");
const cloudinary = require("../configs/cloudinary.config");

const GetAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    const searchCondition = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const skip = (page - 1) * limit;

    const total = Math.ceil((await Service.countDocuments()) / limit);

    const services = await Service.find(searchCondition).skip(skip).limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      services,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const GetAllServiceNames = async (req, res) => {
  try {
    const services = await Service.find().select("name");

    const serviceNames = services.map((service) => service.name);

    res.json(serviceNames);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

function getHtmlFile(files) {
  if (Array.isArray(files) && files.length > 0) {
    for (let file of files) {
      if (file.originalname.endsWith(".html")) {
        return file;
      }
    }
  }

  return -1;
}
function removeExtension(filename) {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return filename;
  }

  return filename.substring(0, lastDotIndex);
}

const Create = async (req, res) => {
  try {
    let uploadedFileUrl = "";
    if (req.files) {
      const file = getHtmlFile(req.files);
      if (file == -1) {
        return res
          .status(400)
          .json({ message: "Aucun fichier n'a été téléchargé." });
      }

      uploadedFileUrl = `uploads/${removeExtension(file.filename)}/${
        file.filename
      }`;
    } else if (req.body.url) {
      uploadedFileUrl = req.body.url;
    } else {
      return res
        .status(400)
        .json({ message: "Aucun fichier n'a été téléchargé." });
    }

    const service = new Service({
      name: req.body.name,
      description: req.body.description,
      url: uploadedFileUrl || req.body.url,
    });

    const newService = await service.save();

    res.status(201).json(newService);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: err.message });
  }
};

const Update = async (req, res) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader
        .upload(req.file.path, { resource_type: "raw" })
        .catch((error) => {
          console.log(error);
        });

      uploadedFileUrl = result.secure_url;
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service non trouvé" });
    }

    res.json(updatedService);
  } catch (err) {
    console.log(err);

    res.status(400).json({ message: err.message });
  }
};

const Delete = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Service supprimé" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  GetAll,
  Create,
  Update,
  Delete,
  GetAllServiceNames,
};
