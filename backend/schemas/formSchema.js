const { default: mongoose } = require("mongoose");

const formSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    // required: true,
    default: {},
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = {
  Form,
};
