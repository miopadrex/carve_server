import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetattoo",
    metadata: (req, file, cb) => {
      cb(null, { fileName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    }
  })
});

export const uploadMiddleware = upload.single("file");
export const uploadController = (req, res) => {
  const {
    file: { location }
  } = req;
  res.json({ location });
};
