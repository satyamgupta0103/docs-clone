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

  // Track if a change was made by the local user
  const isLocalChange = useRef(false);

  const documentRef = doc(db, "documents", "example-doc");

  const saveContent = throttle(() => {
    //Using throttle to avoid refresh at every second.
    if (quillRef.current) {
      const content = quillRef.current.getEditor().getContents();
      console.log(`Saving Content to db:`, content);

      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => {
          console.log("Content Saved");
        })
        .catch(console.error);

      isLocalChange.current = false; // Reset local change flag after saving
    }
  }, 1000);

  useEffect(() => {
    if (quillRef.current) {
      //Load initial content from Firestore
      getDoc(documentRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const savedContent = docSnap.data().content;
            if (savedContent) {
              quillRef.current.getEditor().setContents(saveContent);
            } else {
              console.log(`No doc found, starting with an empty editor.`);
            }
          }
        })
        .catch(console.error);

      //Listen to Firestore for any updates and update locally in real-time
      const unsubscribe = onSnapshot(documentRef, (snapshot) => {
        if (snapshot.exists()) {
          const newContent = snapshot.data().content;

          if (!isEditing) {
            const editor = quillRef.current.getEditor();
            const currentCursorPosition = editor.getSelection()?.index || 0;

            //set content of our doc to the new content
            editor.setContents(newContent, "silent"); //In silent mode to avoid triggerring "text-change" event

            editor.setSelection(currentCursorPosition);
          }
        }
      });

      //Listen for Local text changes and save it to Firebase
      const editor = quillRef.current.getEditor(); // creating a quill instance
      editor.on("text-change", (_delta: any, _oldDelta: any, source: any) => {
        if (source === "user") {
          isLocalChange.current = true; // Mark change as local
          setIsEditing(true);
          saveContent();

          // Reset editing state after 5 seconds of inactivity
          setTimeout(() => {
            setIsEditing(false);
          }, 5000);
        }
      });

      //To avoid memory leaks
      return () => {
        unsubscribe();
        editor.off("text-change");
      };
    }
  }, []);

  return (
    <div className="google-docs-editor">
      <ReactQuill ref={quillRef} />
    </div>
  );
};
