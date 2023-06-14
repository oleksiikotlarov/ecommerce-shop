// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
} from "firebase/firestore";
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  updateMetadata, 
  uploadBytes 
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

export const storage = getStorage(app);
export const db = getFirestore(app);

export const uploadProduct = async (
    formFields,
    selectedOptions,
    selectedImages,
  ) => {
    try {
      const { name, price, subtitle, description } = formFields;

      const productData = {
        id: Date.now(), 
        attributes: {
          name: name,
          price: price,
          thumbnail: {
            data: {
              attributes: {
                url: selectedImages[0]
              }
            }
          },
          slug: name.toLowerCase().replace(/\s/g, "-"),
          subtitle: subtitle,
          description: description,
          sizes: selectedOptions, 
          images: selectedImages,
        }
      }
      
      const prodRef = await addDoc(collection(db, "products"), productData);

      await updateDoc(prodRef, {
        id: prodRef.id
      });
      return prodRef.id;
    } catch (error) {
      console.log(error);    
    }
  }
  