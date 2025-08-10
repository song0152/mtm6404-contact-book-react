import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/db";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function ContactForm({ mode = "create" }) {
  const isEdit = mode === "edit";
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", company: "", notes: ""
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const snap = await getDoc(doc(db, "contacts", id));
      if (snap.exists()) setForm((s) => ({ ...s, ...snap.data() }));
      setLoading(false);
    })();
  }, [id, isEdit]);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      alert("First name, last name, and email are required.");
      return;
    }
    if (isEdit) {
      await updateDoc(doc(db, "contacts", id), { ...form, updatedAt: serverTimestamp() });
      navigate(`/contact/${id}`);
    } else {
      const ref = await addDoc(collection(db, "contacts"), { ...form, createdAt: serverTimestamp() });
      navigate(`/contact/${ref.id}`);
    }
  };

  if (loading) return <p className="empty">Loading form…</p>;

  return (
    <div className="container">
      <div className="card form-card">
        <h2 className="page-title" style={{marginTop:0}}>
          {isEdit ? "Edit Contact" : "New Contact"}
        </h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span className="label">First name *</span>
            <input className="input" value={form.firstName} onChange={(e)=>update("firstName", e.target.value)} required />
          </label>

          <label className="field">
            <span className="label">Last name *</span>
            <input className="input" value={form.lastName} onChange={(e)=>update("lastName", e.target.value)} required />
          </label>

          <label className="field">
            <span className="label">Email *</span>
            <input className="input" type="email" value={form.email} onChange={(e)=>update("email", e.target.value)} required />
          </label>

          <label className="field">
            <span className="label">Phone</span>
            <input className="input" value={form.phone} onChange={(e)=>update("phone", e.target.value)} />
          </label>

          <label className="field span-2">
            <span className="label">Company</span>
            <input className="input" value={form.company} onChange={(e)=>update("company", e.target.value)} />
          </label>

          <label className="field span-2">
            <span className="label">Notes</span>
            <textarea className="textarea" rows="4" value={form.notes} onChange={(e)=>update("notes", e.target.value)} />
          </label>

          <div className="actions span-2">
            <button className="btn primary" type="submit">{isEdit ? "Save changes" : "Create"}</button>
            <button className="btn ghost" type="button" onClick={()=>navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
