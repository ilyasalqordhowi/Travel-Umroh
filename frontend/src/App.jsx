import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/Login";
import DataJamaah from "./page/DataJamaah";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);
const page = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dataJamaah",
    element: <DataJamaah />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={page} />
      </PersistGate>
    </Provider>
  );
}

export default App;
