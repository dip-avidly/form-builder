import React, { useState } from 'react';
import StepperFormPreview from './form-preview/StepperFormPreview';

const FormPreview = ({ screenType = 'mobile', showPreview, closePreviewDrawer, formLayoutComponents }) => {
  const [currentScreenType, setCurrentScreenType] = useState("mobile");

  const handleCloseClick = () => {
    closePreviewDrawer();
  };

  return (
    <>
      {showPreview && (
        <div
          className="drawer"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100vh',
            width: '30vw',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            overflowY: 'auto',
          }}
        >
          <div className="container" style={{ padding: '20px' }}>
            <div
              className="header"
              style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
            >
              {/* <i
                className="fas fa-chevron-right"
                style={{ marginRight: '10px', cursor: 'pointer' }}
                
              ></i> */}
              <div onClick={handleCloseClick}>Close me </div>
              <h4 style={{ margin: 0 }}>Preview</h4>
            </div>
            <StepperFormPreview
              screenType={currentScreenType}
              formLayoutComponents={formLayoutComponents}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormPreview;
