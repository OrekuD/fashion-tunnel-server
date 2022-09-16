import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { IRequest, RouteHandler } from "../types";
import { uploadFile } from "../utils/uploadFile";
import path from "path";

const uploadImages: RouteHandler = async (req: IRequest<any>, res) => {
  if (!req.files) {
    return res.status(400).send({ message: "No file provided" });
  }

  const images: Array<string> = [];
  try {
    const files = req.files.images as UploadedFile[];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await new Promise((resolve) => {
        file.mv(`${__dirname}/${file.name}`, async (error) => {
          if (error) {
            console.log({ error });
            return res
              .status(500)
              .send({ message: "File upload unsuccessful" });
          }

          const { url } = await uploadFile(path.join(__dirname, file.name), {
            access_mode: "public",
            folder: "/images",
          });

          images.push(url);
          fs.unlinkSync(`${__dirname}/${file.name}`);
          resolve(url);
        });
      });
    }
  } catch (error) {
    // console.log({ error });
    return res.status(500).send({ message: "File upload unsuccessful" });
  }
  return res.status(200).send({ images });
};

const ImagesController = {
  uploadImages,
};

export default ImagesController;
