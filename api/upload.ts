import express from "express";
import multer from "multer";
import { initializeApp } from "firebase/app";
import { getStorage, ref ,getDownloadURL ,uploadBytesResumable} from "firebase/storage";

const router = express.Router();

const firebaseConfig = {
  // Your Firebase config
};
initializeApp(firebaseConfig);

const storage = getStorage();

class FileMiddleware { 
  filename = "";
  // Create Multer middleware to save file in memory
  public readonly diskLoader = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 67108864, // 64 MB
    },
  });
}

const fileUpload = new FileMiddleware();

router.post("/", fileUpload.diskLoader.single("file"), async (req, res) => {
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

export default router;
