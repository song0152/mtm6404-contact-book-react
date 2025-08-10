import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import ContactsList from "./pages/ContactsList.jsx";
import ContactDetail from "./pages/ContactDetail.jsx";
import ContactForm from "./pages/ContactForm.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container flex" style={{justifyContent:"space-between"}}>
          <h1 className="brand" onClick={() => navigate("/")}>Contact Book</h1>
          <nav className="nav">
            <NavLink to="/" end>All Contacts</NavLink>
            <NavLink to="/new" className="btn primary">+ New Contact</NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Routes>
            <Route path="/" element={<ContactsList />} />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route path="/new" element={<ContactForm mode="create" />} />
            <Route path="/edit/:id" element={<ContactForm mode="edit" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>

      <footer className="app-footer">
        React Router · Firestore
      </footer>
    </div>
  );
}
