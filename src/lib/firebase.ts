import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use initializeFirestore for more explicit control
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Often helpful in proxied environments like AI Studio
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Connection test as per instructions
async function testConnection() {
  // Give the environment a few seconds to stabilize network connections
  await new Promise(resolve => setTimeout(resolve, 3000));
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("GraphMind: Firestore connectivity verified.");
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        console.log("GraphMind: Firestore reachable (Permission Denied as expected).");
      } else if (error.message.includes('the client is offline')) {
        console.warn("GraphMind: Client offline. Check network.");
      } else {
        console.error("GraphMind: Firestore connection issue:", error.message);
      }
    }
  }
}

testConnection();
