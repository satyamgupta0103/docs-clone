import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import { db } from "../firebase-config";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import { throttle } from "lodash";
import "../App.css";

export const TextEditor = () => {
  const quillRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const saveContent = () => {};

  useEffect(() => {
    if (quillRef.current) {
      //Load initial content from Firestore

      //Listen to Firestore for any updates and update locally in real-time

      //Listen for Local text changes and save it to Firebase
      const editor = quillRef.current.getEditor(); // creating a quill instance
      editor.on("text-change", () => {
        setIsEditing(true);
        saveContent();

        setTimeout(() => {
          setIsEditing(false);
        }, 5000);
      });
    }
  }, []);

  return (
    <div className="google-docs-editor">
      <ReactQuill ref={quillRef} />
    </div>
  );
};
