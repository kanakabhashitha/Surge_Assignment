import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, ResetUser, Error, Verification } from "./pages";
import { AddUser, SharedLayout } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="add-user" element={<AddUser />}></Route>
        </Route>
        <Route path="/reset-user/:id" element={<ResetUser />} />
        <Route path="/verify/:id" element={<Verification />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
