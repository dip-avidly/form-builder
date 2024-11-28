import React from 'react';
import routes from './utils/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import ModalStrip from './components/ModalStrip';

function App() {

  const router = createBrowserRouter(routes)

  return (
    <>
        {/* <ModalStrip /> */}
        <RouterProvider router={router} />
    </>
  );
}

export default App;
