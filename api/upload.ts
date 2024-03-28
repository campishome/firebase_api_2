import express from "express";
export const router = express.Router();
import multer from "multer";
import { initializeApp } from "firebase/app";
import { getStorage, ref ,getDownloadURL ,uploadBytesResumable} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAkbEK5_BnedDgbaaE3CIj6fpWhEtSZ_JU",
    authDomain: "project-upload-image-41825.firebaseapp.com",
    projectId: "project-upload-image-41825",
    storageBucket: "project-upload-image-41825.appspot.com",
    messagingSenderId: "461983508516",
    appId: "1:461983508516:web:6edf86580aca37a0cf50b1"
  };
  initializeApp(firebaseConfig);

  const storage = getStorage();

  class FileMiddleware { 
    // Use class properties instead of instance properties
    // to avoid sharing state between requests
    // Also, provide type definitions for properties
    filename: string = "";
  
    // Create multer object to save file in memory
    public readonly diskLoader = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 67108864, // 64 MB
      },
    });
  }

  const fileUpload = new FileMiddleware();

router.post("/upload", fileUpload.diskLoader.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate a unique filename
    const filename = Date.now() + '-' + req.file.originalname;
    
    const storageRef = ref(storage, "images/" + filename);
    
    const metadata = {
      contentType : req.file.mimetype
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    
    const downloadUrl = await getDownloadURL(snapshot.ref);

    res.json({ filename: downloadUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

