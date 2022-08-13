import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, ResetUser, Error, Verification, ProtectedRoute } from "./pages";

import {
  AddUser,
  SharedLayout,
  AllUser,
  AddNotes,
  AllNotes,
  WelcomePage,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="add-user" element={<AddUser />}></Route>
          <Route path="all-user" element={<AllUser />}></Route>
          <Route path="add-notes" element={<AddNotes />}></Route>
          <Route path="all-notes" element={<AllNotes />}></Route>
          <Route path="/" element={<WelcomePage />}></Route>
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
