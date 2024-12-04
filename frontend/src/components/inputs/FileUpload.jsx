import axios from "axios";
import React, { useEffect, useState } from "react";

export const FileUpload = ({ item, onChange, error, value }) => {
  const maxFiles = item?.maxFile || 1;
  const [selectedFiles, setSelectedFiles] = useState(value || []);
  // useEffect(() => {
  //   if(value?.length > 0)
  //   getInitialFileData();
  // }, [value]);
  // const getInitialFileData = () => {
  //   const files = [];
  //   value?.map(async (ele) => {
  //     const { data } = await axios.post(
  //       "http://localhost:3000/get-public-url",
  //       {
  //         url: ele?.url,
  //       }
  //     );
  //     const response = await fetch(data);

  //     const blob = await response.blob();
  //     const file = new File([blob], ele?.name, { contentType: ele?.type });
  //     files.push(file);
  //   });
  //   console.log("files123123: ", files);
  //   setSelectedFiles(files);
  // };
  // console.log("files1111111111111: ", selectedFiles);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const updatedFiles = [...selectedFiles, ...filesArray];
    console.log("updatedFiles12312312: ", updatedFiles);
    setSelectedFiles(updatedFiles);
    onChange(item.id, updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    console.log("updatedFiles: ", updatedFiles);
    setSelectedFiles(updatedFiles);
    onChange(item.id, updatedFiles, ""); // Update Formik value
  };

  return (
    <div style={{ width: `${item?.width || 100}%` }}>
      <input
        type="file"
        id={item.controlName + item.id}
        multiple={maxFiles > 1} // Enable multi-file selection if maxFiles > 1
        onChange={handleFileChange}
        // value={selectedFiles}
      />
      <label htmlFor={item.controlName + item.id}>
        <i className="fas fa-cloud-upload-alt"></i> Upload
      </label>
      {selectedFiles?.length > 0 && (
        <ul>
          {selectedFiles.map((file, index) => {
            console.log("file123123: ", file.size / (1024 * 1024));
            return (
              <li key={index}>
                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB){" "}
                <button type="button" onClick={() => removeFile(index)}>
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
