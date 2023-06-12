// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  updateDoc, 
  DocumentData
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
  apiKey: "AIzaSyA3kMjMVPdf3wJFZZeNzraUWCxLibvW3_k",
  authDomain: "store-check-f2ae3.firebaseapp.com",
  projectId: "store-check-f2ae3",
  storageBucket: "store-check-f2ae3.appspot.com",
  messagingSenderId: "516864499797",
  appId: "1:516864499797:web:2638edeedbc4bb2db2f4dc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

const storage = getStorage(app);
export const db = getFirestore(app);

export const uploadProduct = async (
    formFields,
    file,
    fileName,
    selectedOptions
  ) => {
    try {
      const { name, price, subtitle, description } = formFields;
      
      const imageRef = ref(storage, `images/${fileName}`);
      const uploadImage = await uploadBytes(imageRef, file);
      
      const newMetadata = {
        cacheControl: 'public,max-age=2629800000', 
        contentType: uploadImage.metadata.contentType
      };
      
      await updateMetadata(imageRef, newMetadata);
      
      const publicImageUrl = await getDownloadURL(imageRef)

      const productData = {
        id: Date.now(), 
        attributes: {
          name: name,
          price: price,
          thumbnail: {
            data: {
              attributes: {
                url: publicImageUrl
              }
            }
          },
          slug: name.toLowerCase().replace(/\s/g, "-"),
          subtitle: subtitle,
          description: description,
          sizes: selectedOptions, 
          images: [ "url1", "url2"]
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
  