import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/db";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function initials(firstName = "", lastName = "") {
  const a = (firstName[0] || "").toUpperCase();
  const b = (lastName[0] || "").toUpperCase();
  return `${a}${b}` || "NA";
}

export default function ContactsList() {
  const [contacts, setContacts] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("lastName"), orderBy("firstName"));
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setContacts(rows);
    });
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    if (!contacts) return [];
    const s = search.trim().toLowerCase();
    if (!s) return contacts;
    return contacts.filter((c) => {
      const fn = (c.firstName || "").toLowerCase();
      const ln = (c.lastName || "").toLowerCase();
      return fn.includes(s) || ln.includes(s);
    });
  }, [contacts, search]);

  if (contacts === null) return <p className="empty">Loading contacts…</p>;

  return (
    <div className="grid" style={{gap: 18}}>
      <div className="flex" style={{justifyContent:"space-between"}}>
        <div className="flex" style={{gap: 8}}>
          <Link className="btn ghost" to="/">All Contacts</Link>
          <Link className="btn primary" to="/new">+ New Contact</Link>
        </div>
        <input
          className="input"
          style={{maxWidth: 340}}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by first or last name"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No contacts found.</div>
      ) : (
        <ul className="list grid" style={{gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))"}}>
          {filtered.map((c) => (
            <li key={c.id} className="card">
              <Link to={`/contact/${c.id}`} className="card-row" style={{textDecoration:"none"}}>
                <div className="avatar">{initials(c.firstName, c.lastName)}</div>
                <div>
                  <div className="title">{c.lastName || "?"}, {c.firstName || "?"}</div>
                  <div className="sub">{c.email || "No email"}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
