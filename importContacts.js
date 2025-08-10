import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1kYclGN0QPdDU0-pz7L9tUVkX7kd6C_Q",
  authDomain: "my-firebase-project-836c4.firebaseapp.com",
  databaseURL: "https://my-firebase-project-836c4-default-rtdb.firebaseio.com",
  projectId: "my-firebase-project-836c4",
  storageBucket: "my-firebase-project-836c4.firebasestorage.app",
  messagingSenderId: "503498094466",
  appId: "1:503498094466:web:1d585727871f54ef58019b"
}

const contacts = [
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@gmail.com",
    phone: "987-654-3210",
    company: "Creative Studio",
    notes: "Old college friend"
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@gmail.com",
    phone: "555-123-7890",
    company: "Brown Consulting",
    notes: "Potential business partner"
  },
  {
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@gmail.com",
    phone: "444-888-2222",
    company: "GreenLeaf Design",
    notes: "Project collaborator"
  },
  {
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@gmail.com",
    phone: "321-555-9876",
    company: "Wilson Tech",
    notes: "Met during startup pitch"
  },
  {
    firstName: "Sarah",
    lastName: "Taylor",
    email: "sarah.taylor@gmail.com",
    phone: "666-777-8888",
    company: "Taylor & Co.",
    notes: "Friend from community group"
  },
  {
    firstName: "Chris",
    lastName: "Anderson",
    email: "chris.anderson@gmail.com",
    phone: "222-333-4444",
    company: "Anderson Media",
    notes: "Photography project"
  },
  {
    firstName: "Laura",
    lastName: "Martinez",
    email: "laura.martinez@gmail.com",
    phone: "777-999-1111",
    company: "Martinez Marketing",
    notes: "Shared office space"
  },
  {
    firstName: "Robert",
    lastName: "Clark",
    email: "robert.clark@gmail.com",
    phone: "888-444-6666",
    company: "Clark Solutions",
    notes: "Referral from Michael"
  },
  {
    firstName: "Olivia",
    lastName: "Lewis",
    email: "olivia.lewis@gmail.com",
    phone: "555-222-3333",
    company: "Lewis Architecture",
    notes: "Design collaboration"
  }
];

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

(async () => {
  try {
    for (const c of contacts) {
      await addDoc(collection(db, "contacts"), c);
      console.log(`Added: ${c.firstName} ${c.lastName}`);
    }
    console.log("All contacts imported successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error adding contacts:", err);
    process.exit(1);
  }
})();
