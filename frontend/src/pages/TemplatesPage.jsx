import React, { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
import NewFormDialogComponent from "../components/FormTemplates/NewFormDialogComponent";
import FormLayoutComponent from "../components/FormTemplates/FormLayoutComponent";
import DemoFormLayouts from "../utils/demoFormLayouts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  // const templates = useAppSelector(
  //   (state) => state.entities.formBuilder.allTemplates
  // );
  // const dispatch = useAppDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const getAllTemplates = async () => {
    const { data } = await axios.get("http://localhost:3000/all-templates");
    let defaultTemplates = [];
    data?.data?.map((ele) => {
      defaultTemplates.push({
        id: ele?._id,
        formName: ele?.name,
        formLayoutComponents: ele?.data,
      });
    });
    setTemplates(defaultTemplates);
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  // useEffect(() => {
  //   if (templates.length === 0) {
  //     dispatch(getAllTemplates());
  //   }
  // }, []);

  const newFormLayout = {
    border: "1px dashed",
    width: "150px",
    height: "150px",
    fontSize: "2.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "9px",
  };

  return (
    <>
      <div className="d-flex mt-5 flex-column align-items-center justify-content-center">
        <h3>All Form Templates</h3>
        <div className="form-templates row mt-3">
          <FormLayoutComponent
            createdFormLayout={false}
            setOpenDialog={setOpenDialog}
          />
          {templates.map((template) => (
            <>
              <FormLayoutComponent
                key={template.id}
                template={template}
                createdFormLayout={true}
                template_id={template?.id}
              />
            </>
          ))}
        </div>
      </div>
      <NewFormDialogComponent
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};

export default TemplatesPage;
