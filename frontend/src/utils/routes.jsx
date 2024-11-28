import React from "react";
import MainLayout from "../layouts/MainLayout";
import FormBuilderPage from "../pages/FormBuilderPage";
import TemplatesPage from "../pages/TemplatesPage";
import FormPreviewPage from "../pages/FormPreview";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "formbuilder/:formId",
        element: <FormBuilderPage />,
      },
      {
        path: "/",
        element: <TemplatesPage />,
      },
      {
        path: ":formId/formpreview",
        element: <FormPreviewPage />,
      },
      {
        path: ":formId/formpreview/:id",
        element: <FormPreviewPage />,
      },
    ],
  },
];

export default routes;
