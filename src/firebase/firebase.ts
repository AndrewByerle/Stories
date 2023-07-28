// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { computed } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  //   signInWithPopup,
  signInWithRedirect,
  setPersistence,
  //   browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";

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

const useFirebase = () => {
  const isLoggedIn = computed(async () => {
    return (await getCurrentUser()) !== null;
  });

  const signInWithGoogle = () => {
    // Redirect preferred on mobile
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    const auth = getAuth();

    auth.languageCode = "it";
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });

    signInWithRedirect(auth, provider)
      .then((res) => {
        console.log(res, isLoggedIn.value);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return { isLoggedIn, signInWithGoogle, app };
};

export default useFirebase;
