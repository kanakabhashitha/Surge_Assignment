import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Error, Verification } from "./pages";
import { AddUser, SharedLayout } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="add-user" element={<AddUser />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
