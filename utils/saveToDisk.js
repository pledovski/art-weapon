const axios = require("axios");
const path = require("path");
const fs = require("fs");
const util = require("util");
// const asyncHandler = require("../middleware/async");
const ErrorResponse = require("./errorResponse");
const { uniqid } = require("./uniqid");

module.exports = class File {
  async saveToDisk(files, file_prefix) {
    if (!files) {
      throw new ErrorResponse(`Будь ласка, завантажте файл.`, 400);
    }
    if (
      !files.file.mimetype.startsWith("image") &&
      !files.file.mimetype.startsWith("video") &&
      !files.file.mimetype.startsWith("application/pdf")
    ) {
      throw new ErrorResponse(`Будь ласка, завантажте графічний файл.`, 400);
    }

    if (files.file.size > process.env.MAX_FILE_SIZE) {
      throw new ErrorResponse(
        `Максимальний дозволений розмір файлу ${process.env.MAX_FILE_SIZE / 1048576} мегабайт`,
        400
      );
    }

    let file = files.file;
    let fileId = uniqid();

    file.name = `${file_prefix}_${fileId}${path.extname(file.name)}`;

    // Save file to disk
    file.mv(`${process.env.UPLOAD_PATH}/${file_prefix}s/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        throw new ErrorResponse(`Проблема завантаження файла.`, 500);
      }
    });
    return file.name;
  }

  async removeFileFromDisk(p) {
    return new Promise((resolve, reject) => {
      fs.unlink(p, (err) => {
        if (err) {
          console.log(err);
          // reject(new ErrorResponse("Помилка видалення файла", 500));
        }
        resolve(true);
      });
    });
  }

  async downloadAndSave(url, p, prefix) {
    try {
      const file = await axios({ method: "GET", url, responseType: "stream" });
      let filename = `${prefix}_${uniqid()}.jpg`;
      p = p.concat(filename);
      file.data.pipe(fs.createWriteStream(p));

      return new Promise((resolve, reject) => {
        file.data.on("end", () => resolve(filename));
        file.data.on("error", (err) =>
          reject(new ErrorResponse("Похибка завантаження або запису файла.", 500))
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  async saveToJson(data, p) {
    data.pipe(fs.createWriteStream(p));
  }

  async read_file(path) {
    // util.promisify(fs.readFile)
    // await fs.readFile(path, function (err, data) {
    //   if (err) {
    //     console.log(err);
    //     return new ErrorResponse("Помилка зчитування файла", 500);
    //   }
    //   console.log(data);
    //   return data;
    // });
    return fs.readFileSync(path);
  }
};
