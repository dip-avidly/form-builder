import React, { useEffect, useState } from "react";
import FormBuilder from "../components/FormBuilder/FormBuilder";
import { useParams } from "react-router-dom";
import axios from "axios";
import useFormBuilder from "../components/FormBuilder/hooks/useFormBuilder";
import FormPreview from "../components/FormBuilder/subcomponents/FormPreview";
import StepperFormPreview from "../components/FormBuilder/subcomponents/form-preview/StepperFormPreview";
const FormPreviewPage = () => {
  const [template, setTemplate] = useState();
  const [defaultData, setDefaultData] = useState(null);
  // const {
  //   handleItemAdded,
  //   saveForm,
  //   deleteContainer,
  //   deleteControl,
  //   editContainerProperties,
  //   editControlProperties,
  //   moveControl,
  //   moveControlFromSide,
  //   selectControl,
  //   selectedTemplate,
  //   formLayoutComponents,
  //   selectedControl,
  // } = useFormBuilder(
  //   template
  //     ? { template: template }
  //     : { template: { formLayoutComponents: [] } }
  // );
  const { formId, id } = useParams();

  useEffect(() => {
    getForm();
  }, [formId]);

  useEffect(() => {
    console.log("id?.length: ", id?.length);
    if (id?.length > 0) {
      getDefaultValues();
    }
  }, [id]);
  const getForm = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/get-forms/${formId}`
    );
    const formData = data?.data;
    const initalTemplate = {
      id: formData?._id,
      formName: formData?.name,
      formLayoutComponents: formData?.data || [],
    };
    setTemplate(initalTemplate);
  };

  const getDefaultValues = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/get-form-entry/${id}`
    );
    const defaultData = data?.data;
    console.log("defaultData: ", defaultData);
    setDefaultData(defaultData?.data);
  };

  const defaultForm = {
    id: "0",
    formName: "",
    createdAt: 0,
    creator: "",
    formLayoutComponents: [],
    lastPublishedAt: 0,
    publishHistory: [],
    publishStatus: "draft",
    updatedAt: 0,
  };

  return (
    template && (
      <>
        <div className="container" style={{ padding: "20px" }}>
          <StepperFormPreview
            screenType={"mobile"}
            formLayoutComponents={template?.formLayoutComponents}
            formId={formId}
            defaultValues={defaultData}
          />
        </div>
      </>
    )
  );
};

export default FormPreviewPage;
