const { default: mongoose } = require("mongoose");

const formEntrySchema = mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  data: {
    type: Object,
    // required: true,
    // default: {},
  },
});

const FormEntry = mongoose.model("FormEntry", formEntrySchema);

module.exports = {
  FormEntry,
};
