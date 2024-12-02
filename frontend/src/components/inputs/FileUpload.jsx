import React, { useState } from "react";

export const FileUpload = ({ item, onChange, error }) => {
  const maxFiles = item?.maxFile || 1;
  const maxSize = item?.maxSize || 5; // Default to 5 MB
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);

    // // Check file size validation
    // const oversizedFiles = filesArray.filter(
    //   (file) => file.size > maxSize * 1024 * 1024
    // );

    // if (oversizedFiles.length > 0) {
    //   onChange(item.id, [], `Each file must be smaller than ${maxSize} MB.`);
    //   return;
    // }

    // // Check file count validation
    // if (filesArray.length + selectedFiles.length > maxFiles) {
    //   onChange(
    //     item.id,
    //     [],
    //     `You can only upload a maximum of ${maxFiles} files.`
    //   );
    //   return;
    // }

    const updatedFiles = [...selectedFiles, ...filesArray];
    setSelectedFiles(updatedFiles);
    onChange(item.id, updatedFiles, "");
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onChange(item.id, updatedFiles, ""); // Update Formik value
  };

  return (
    <div>
      <input
        type="file"
        id={item.controlName + item.id}
        multiple={maxFiles > 1} // Enable multi-file selection if maxFiles > 1
        onChange={handleFileChange}
      />
      <label htmlFor={item.controlName + item.id}>
        <i className="fas fa-cloud-upload-alt"></i> Upload
      </label>
      {selectedFiles.length > 0 && (
        <ul>
          {selectedFiles.map((file, index) => (
            <li key={index}>
              {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB){" "}
              <button type="button" onClick={() => removeFile(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <div style={{ color: "red", fontSize: "12px" }}>{error}</div>}
    </div>
  );
};
