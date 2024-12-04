const express = require("express");
const { connectDB } = require("./config/db.config");
const cros = require("cors");
const { Form } = require("./schemas/formSchema");
const { FormEntry } = require("./schemas/formEntrySchema");
const multer = require("multer");
const {
  uploadFileToS3,
  getPublicUrl,
  removeFileFromS3,
} = require("./utils/aws");

const app = express();

app.use(express.json());

app.use(cros("*"));

const upload = multer({ storage: multer.memoryStorage() });
const uploadFields = upload.fields();

connectDB();

app.post("/create-forms", async (req, res, next) => {
  const body = req.body;
  console.log("body: ", body);
  const data = await Form.create(body);
  console.log("data: ", data);
  return res.status(200).send({ data });
});

app.get("/get-forms/:formId", async (req, res, next) => {
  const { formId } = req.params;
  const data = await Form.findOne({ _id: formId });
  return res.status(200).send({ data });
});

app.put("/forms/:formId", async (req, res, next) => {
  const { formId } = req.params;
  const { data: updatedData } = req?.body;
  const data = await Form.updateOne({ _id: formId }, { data: updatedData });
  return res.status(200).send({ data });
});

app.get("/all-templates", async (req, res, next) => {
  const data = await Form.find();
  return res.status(200).send({ data });
});

app.post("/form-entry/:formId", upload.any(), async (req, res, next) => {
  try {
    const { formId } = req.params;
    const id = req?.query?.id;
    const files = req.files;
    console.log("files123 123 : ", files);
    let body = req?.body;

    const uploadedFiles = {};
    const deleteFiles =
      req?.body?.deleteFiles?.length > 0
        ? JSON.parse(req?.body?.deleteFiles)
        : [];

    // Upload each file to S3
    for await (const file of files) {
      const temp = await uploadFileToS3(file);
      if (uploadedFiles[file?.fieldname]) {
        uploadedFiles[file?.fieldname] = [
          ...uploadedFiles[file?.fieldname],
          {
            url: temp,
            name: file?.originalname,
            size: file?.size,
            type: file?.mimetype,
          },
        ];
      } else {
        uploadedFiles[file?.fieldname] = [
          {
            url: temp,
            name: file?.originalname,
            size: file?.size,
            type: file?.mimetype,
          },
        ];
      }
    }

    if (Object.keys(uploadedFiles).length > 0) {
      body = {
        ...body,
        ...uploadedFiles,
      };
    }
    for await (const file of deleteFiles) {
      await removeFileFromS3(file?.url);
    }
    delete body?.deleteFiles;
    if (id) {
      const savedEntry = await FormEntry.updateOne(
        { _id: id },
        {
          data: body,
        }
      );
    } else {
      const savedEntry = await FormEntry.create({
        formId,
        data: body,
      });
    }

    return res.status(200).send({
      message: "Form entry created successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error handling form entry:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
  // return res.status(200).send({ data });
});

app.get("/get-form-entry/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await FormEntry.findOne({ _id: id });
  return res.status(200).send({ data });
});

app.put("/upadate-form-entry/:id", uploadFields, async (req, res, next) => {
  const { id } = req.params;
  const { data: updatedData } = req?.body;
  const data = await FormEntry.updateOne({ _id: id }, { data: updatedData });
  return res.status(200).send({ data: null });
});

app.post("/get-public-url", async (req, res, next) => {
  const { url } = req?.body;
  const data = await getPublicUrl(url, 600);
  console.log("data: ", data);

  return res.status(200).send({ data });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
