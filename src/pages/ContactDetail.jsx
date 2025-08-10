import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/db";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const ref = doc(db, "contacts", id);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) {
        setNotFound(true);
      } else {
        setContact({ id: snap.id, ...snap.data() });
      }
    });
    return () => unsub();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this contact?")) return;
    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  if (notFound) return <p className="empty">Contact not found.</p>;
  if (!contact) return <p className="empty">Loading…</p>;

  const { firstName, lastName, email, phone, company, notes } = contact;

  const initials = `${(firstName || "?")[0]}${(lastName || "?")[0]}`.toUpperCase();

  return (
    <div className="container">
      <div className="card detail-card">
        <div className="detail-head">
          <div className="avatar lg">{initials}</div>
          <div>
            <h2 className="page-title" style={{margin:0}}>
              {lastName || "?"}, {firstName || "?"}
            </h2>
            <div className="sub">{company || "—"}</div>
          </div>
        </div>

        <div className="detail-grid">
          <div className="field">
            <span className="label">Email</span>
            <span className="value">{email || "—"}</span>
          </div>
          <div className="field">
            <span className="label">Phone</span>
            <span className="value">{phone || "—"}</span>
          </div>
          <div className="field span-2">
            <span className="label">Notes</span>
            <span className="value">{notes || "—"}</span>
          </div>
        </div>

        <div className="actions">
          <Link className="btn" to={`/edit/${id}`}>Edit</Link>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
          <Link className="btn ghost" to="/">Back</Link>
        </div>
      </div>
    </div>
  );
}
