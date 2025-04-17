import { useEffect } from "react";
import { auth } from "./firebase-config";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import "./App.css";
import { TextEditor } from "./components/TextEditor";

function App() {
  useEffect(() => {
    signInAnonymously(auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User signed in:`, user.uid);
      }
    });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>DocSync</h1>
      </header>
      <TextEditor />
    </div>
  );
}

export default App;
