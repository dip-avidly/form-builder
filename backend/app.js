const express = require("express");
const { connectDB } = require("./config/db.config");
const cros = require("cors");
const { Form } = require("./schemas/formSchema");
const { FormEntry } = require("./schemas/formEntrySchema");

const app = express();

app.use(express.json());

app.use(cros("*"));

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

app.post("/form-entry/:formId", async (req, res, next) => {
  const { data } = req.body;
  const { formId } = req.params;
  const responce = await FormEntry.create({ formId, data: data });
  return res.status(200).send({ data });
});

app.get("/get-form-entry/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await FormEntry.findOne({ _id: id });
  return res.status(200).send({ data });
});

app.put("/upadate-form-entry/:id", async (req, res, next) => {
  const { id } = req.params;
  const { data: updatedData } = req?.body;
  const data = await FormEntry.updateOne({ _id: id }, { data: updatedData });
  return res.status(200).send({ data });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
