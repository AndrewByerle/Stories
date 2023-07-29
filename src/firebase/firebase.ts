import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { computed, ref } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  signOut,
  //   browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  getRedirectResult,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { User } from "../definitions/types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
setPersistence(getAuth(), browserLocalPersistence);

// const analytics = getAnalytics(app);

const getCurrentUser = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener(), resolve(user);
      },
      reject
    );
  });
};

const db = getFirestore();

const createUserFB = (user: User) => {
  try {
    setDoc(doc(db, "users", user.uid), {
      ...user,
    });
  } catch (e) {
    console.log(e);
  }
};

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const useFirebase = () => {
  const isLoggedIn = computed(async () => {
    return (await getCurrentUser()) !== null;
  });

  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const signInWithGoogle = async () => {
    const auth = getAuth();
    try {
      await signInWithRedirect(auth, provider)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRedirectResult = async () => {
    const auth = getAuth();
    await getRedirectResult(auth)
      .then((result) => {
        if (!result) {
          console.log("Redirect result is null");
          return;
        }
        // Google Access Token. Can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        const user = result.user;
        const userData: User = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        };
        createUserFB(userData);
        console.log("created user:", user);
        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return {
    isLoggedIn,
    signInWithGoogle,
    app,
    signOutUser,
    fetchRedirectResult,
  };
};

export default useFirebase;
