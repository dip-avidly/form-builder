import { useState } from "react";
import {
  FormItemTypes,
  FormPublishStatus,
} from "../../../utils/formBuilderUtils";
import { generateID } from "../../../utils/common";
import moment from "moment";
import axios from "axios";

const useFormBuilder = (props) => {
  const [selectedTemplate, setSelectedTemplate] = useState(props.template);
  const [formLayoutComponents, setFormLayoutComponents] = useState(
    props.template.formLayoutComponents
  );
  console.log("formLayoutComponents1 23: ", formLayoutComponents);
  const [selectedControl, setSelectedControl] = useState(undefined);

  // Handles a Container or a Component added on the form builder
  const handleItemAdded = (item, containerId) => {
    if (item.itemType === FormItemTypes.CONTAINER) {
      const newState = formLayoutComponents.slice();
      newState.push({
        container: { ...item, id: generateID() },
        children: [],
      });
      setFormLayoutComponents(newState);
    } else if (item.itemType === FormItemTypes.CONTROL) {
      const newState = formLayoutComponents.slice();
      const formContainerId = newState.findIndex(
        (f) => f.container.id === containerId
      );
      const formContainer = { ...newState[formContainerId] };
      const obj = { ...item, id: generateID(), containerId: containerId };

      // Create a deep copy of items.
      const childItem = item;
      if (childItem.items) {
        obj.items = JSON.parse(JSON.stringify(childItem.items));
      }
      const newChildren = formContainer.children.slice();
      newChildren.push(obj);
      formContainer.children = newChildren;
      newState[formContainerId] = formContainer;
      setFormLayoutComponents(newState);
    }
  };

  // Delete a container from the layout
  const deleteContainer = (containerId) => {
    if (confirm("Are you sure you want to delete container?")) {
      const newState = formLayoutComponents.filter(
        (comp) => comp.container.id !== containerId
      );
      setFormLayoutComponents(newState);
      setSelectedControl((prev) =>
        prev && (prev.id === containerId || prev.containerId === containerId)
          ? undefined
          : prev
      );
    }
  };

  // Delete a control from the layout
  const deleteControl = (controlId, containerId) => {
    const newState = formLayoutComponents.slice();
    const formContainer = newState.filter(
      (comp) => comp.container.id === containerId
    )[0];
    formContainer.children = formContainer.children.filter(
      (cont) => cont.id !== controlId
    );
    setFormLayoutComponents(newState);
    setSelectedControl((prev) =>
      prev && prev.id === controlId ? undefined : prev
    );
  };

  // Selet a control on click
  const selectControl = (item) => {
    setSelectedControl(item);
  };

  // Edit properties of the control from Sidebar
  const editControlProperties = (item) => {
    const newState = formLayoutComponents.slice();
    const formContainerId = newState.findIndex(
      (comp) => comp.container.id === item.containerId
    );
    let formContainer = { ...newState[formContainerId] };
    formContainer.children.forEach((cont, ind) => {
      if (cont.id === item.id) {
        const newChildren = formContainer.children.slice();
        newChildren[ind] = item;
        formContainer.children = newChildren;
        return;
      }
    });
    newState[formContainerId] = formContainer;
    setFormLayoutComponents(newState);
  };

  // Edit properties of the container
  const editContainerProperties = (item) => {
    const newState = formLayoutComponents.slice();
    const formContainerId = newState.findIndex(
      (comp) => comp.container.id === item.id
    );
    const formContainer = { ...newState[formContainerId] };
    formContainer.container = {
      ...formContainer.container,
      heading: item.heading,
      subHeading: item.subHeading,
    };
    newState[formContainerId] = formContainer;
    setFormLayoutComponents(newState);
  };

  // Move a control from the sidebar based on the values on Drop Down
  const moveControlFromSide = (item, { containerId, position }) => {
    let componentsCopy = JSON.parse(JSON.stringify(formLayoutComponents));

    const currentItemContainer = componentsCopy.filter((con, ind) => {
      return con.container.id === item.containerId;
    })[0];

    const moveItemToContainer = componentsCopy.filter((con, ind) => {
      return con.container.id === containerId;
    })[0];

    const itemIndex = currentItemContainer.children.findIndex(
      (con) => con.id === item.id
    );

    const deletedItem = currentItemContainer.children.splice(itemIndex, 1);
    deletedItem[0].containerId = containerId;

    if (position !== undefined) {
      moveItemToContainer.children.splice(position, 0, deletedItem[0]);
    } else {
      if (item.containerId !== containerId) {
        if (position) {
          moveItemToContainer.children.splice(position, 0, deletedItem[0]);
        }
      } else {
        moveItemToContainer.children.splice(itemIndex, 0, deletedItem[0]);
      }
    }
    setSelectedControl(deletedItem[0]);
    setFormLayoutComponents(componentsCopy);
  };

  // Move control when dragged to a different position
  const moveControl = (item, dragIndex, hoverIndex, containerId) => {
    if (item === undefined) {
      return;
    }
    let componentsCopy = JSON.parse(JSON.stringify(formLayoutComponents));

    if (dragIndex !== undefined && item.id) {
      if (item.containerId === containerId) {
        const formContainer = componentsCopy.filter((con, ind) => {
          return con.container.id === containerId;
        })[0];
        const deletedItem = formContainer.children.splice(
          formContainer.children.findIndex((con) => con.id === item.id),
          1
        );
        // Just to be sure that there is a item deleted
        if (deletedItem.length === 0) {
          return;
        }
        formContainer.children.splice(hoverIndex, 0, deletedItem[0]);
      }
      setFormLayoutComponents(componentsCopy);
    }
  };

  const checkIfControlsInContainer = () => {
    for (let i = 0; i < formLayoutComponents.length; i++) {
      let componentChildren = formLayoutComponents[i].children;
      // if (componentChildren.length === 0) {
      //   showModalStrip(
      //     "danger",
      //     "You need to have controls inside containers before updating.",
      //     5000
      //   );
      //   return false;
      // }
    }
    return true;
  };

  // const publishForm = () => {
  //   if (formLayoutComponents.length === 0) {
  //     showModalStrip("danger", "Form cannot be empty", 5000);
  //     return;
  //   }

  //   if (!checkIfControlsInContainer()) {
  //     return;
  //   }

  //   let currentTemplate = JSON.parse(JSON.stringify(selectedTemplate));

  //   // Check if there is a change in the previous published version
  //   if (
  //     currentTemplate.publishHistory.length > 0 &&
  //     JSON.stringify(currentTemplate.publishHistory[0].formLayoutComponents) ===
  //       JSON.stringify(formLayoutComponents)
  //   ) {
  //     showModalStrip(
  //       "info",
  //       "No Change in current & previous published version.",
  //       5000
  //     );
  //     return;
  //   }

  //   let updatedAt = moment().unix() * 1000;

  //   if (currentTemplate.lastPublishedAt !== 0) {
  //     // Add current layout components to publish history
  //     currentTemplate.publishHistory.splice(0, 0, {
  //       lastPublishedAt: currentTemplate.lastPublishedAt,
  //       formLayoutComponents: currentTemplate.formLayoutComponents,
  //     });
  //   }
  //   currentTemplate.formLayoutComponents = formLayoutComponents;
  //   currentTemplate.publishStatus = FormPublishStatus.PUBLISHED;
  //   currentTemplate.lastPublishedAt = updatedAt;
  //   currentTemplate.updatedAt = updatedAt;

  //   dispatch(saveTemplate(currentTemplate))
  //     .unwrap()
  //     .then((newTemplate) => {
  //       // Adding this so that the current template in the state is updated.
  //       setSelectedTemplate(newTemplate);
  //       showModalStrip("success", "Changes in Form Published.", 5000);
  //     });
  // };

  const saveForm = async () => {
    // if (formLayoutComponents.length === 0) {
    //   showModalStrip("danger", "Form cannot be empty", 5000);
    //   return;
    // }

    if (!checkIfControlsInContainer()) {
      return;
    }
    const currentTemplate = JSON.parse(JSON.stringify(selectedTemplate));

    // if (
    //   JSON.stringify(currentTemplate.formLayoutComponents) ===
    //   JSON.stringify(formLayoutComponents)
    // ) {
    //   showModalStrip(
    //     "info",
    //     "No Change in current & previous saved version.",
    //     5000
    //   );
    //   return;
    // }
    currentTemplate.formLayoutComponents = formLayoutComponents;
    currentTemplate.publishStatus = FormPublishStatus.DRAFT;
    currentTemplate.updatedAt = moment().unix() * 1000;

    console.log("currentTemplate: ", currentTemplate?.formLayoutComponents);
    console.log(" 1232134currentTemplate: ", currentTemplate);
    await axios.put(`http://localhost:3000/forms/${currentTemplate?.id}`, {
      data: currentTemplate?.formLayoutComponents,
    });
    // dispatch(saveTemplate(currentTemplate))
    //   .unwrap()
    //   .then((resolvedvalue) => {
    //     console.log("resolvedvalue 2134234: ", resolvedvalue);
    //     // showModalStrip("success", "Changes in Form Saved.", 5000);
    //   });
  };

  return {
    handleItemAdded,
    deleteContainer,
    deleteControl,
    selectControl,
    editContainerProperties,
    editControlProperties,
    moveControlFromSide,
    moveControl,
    // publishForm,
    saveForm,
    selectedTemplate,
    formLayoutComponents,
    selectedControl,
  };
};

export default useFormBuilder;
