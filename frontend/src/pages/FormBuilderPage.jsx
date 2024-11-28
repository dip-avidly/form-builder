import React, { useEffect, useState } from "react";
import FormBuilder from "../components/FormBuilder/FormBuilder";
import { generateID } from "../utils/common";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   getSingleTemplate,
//   setSelectedTemplateNull,
// } from "../redux/entities/formBuilderEntity";

const FormBuilderPage = () => {
  const [template, setTemplate] = useState();
  // {
  //   id: generateID(),
  //   formName: "Test",
  //   createdAt: new Date(),
  //   creator: "Test User",
  //   formLayoutComponents: [],
  //   lastPublishedAt: 0,
  //   publishHistory: [],
  //   publishStatus: "draft",
  //   updatedAt: 0,
  // }
  // const navigate = useNavigate();
  const { formId } = useParams();

  useEffect(() => {
    getForm();
  }, [formId]);
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
    return data;
  };
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const template = await dispatch(
  //         getSingleTemplate(formId)
  //       ).unwrap();
  //       console.log(template);
  //       if(!template){
  //         throw new Error('Not found');
  //       }
  //     } catch (ex) {
  //       showModalStrip("danger", "The form id is not correct", 5000);
  //       navigate("/");
  //     }
  //   })();

  //   return () => {
  //     // Setting template to null when unmounting.
  //     dispatch(setSelectedTemplateNull());
  //   };
  // }, []);

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
    <>
      {template ? (
        <FormBuilder template={template ? template : defaultForm} />
      ) : null}
    </>
  );
};

export default FormBuilderPage;
