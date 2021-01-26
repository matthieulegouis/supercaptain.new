## Init the project

1. Create a Firestore project on firebase.
2. Get the firebaseConfig on the firebase console.
3. Create a new file called `.env.local`.
4. Copy the firebaseConfig into this new file:

```
NEXT_PUBLIC_FIREBASE_API_KEY="...complete with the firebaseConfig..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="...complete with the firebaseConfig..."
NEXT_PUBLIC_FIREBASE_DATABASE_URL="...complete with the firebaseConfig..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="...complete with the firebaseConfig..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="...complete with the firebaseConfig..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="...complete with the firebaseConfig..."
NEXT_PUBLIC_FIREBASE_APP_ID="...complete with the firebaseConfig..."
```

5. Create a project on vercel.com.
6. Add the firebaseConfig into the "Environment Variables" on vercel.com (settings/environment-variables).

## Configure nodemailer

1. Follow the steps from this blog: https://medium.com/@alexb72/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9
2. Copy the keys into the file `/functions/index.js`.

## Init firebase cloud functions

1. Go to: `cd /project/functions`.
2. Log in into your firebase project: `firebase login`.
3. Deploy the functions: `firebase deploy --only functions`.

## Set rules in Firebase

1. Go to "Cloud Firestore" then "Rules":

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Emails collection
    match /emails/{email} {
      allow read: if true;
      allow write: if false;
    }
    // Skills collection
    match /skills/{item} {
    	allow read: if true;
      allow write: if true;
  	}
    // Usernames collection
    match /usernames/{username} {
      allow read: if true;
      allow write: if false;
    }
    // Codes collection
    match /codes/{mail} {
      allow read, write: if false;
    }
    // Users collection
    match /users/{uid} {
      allow read: if true;
      allow write: if request.auth.uid == uid;
      match /timeline/{item} {
        allow read: if true;
        allow write: if request.auth.uid == uid;
    	}
      match /skills/{item} {
        allow read: if true;
        allow write: if request.auth.uid == uid;
    	}
    }
  }
}
```

2. Go to "Storage" then "Rules":

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```

## Launch the project

`npm install`
`npm run dev` for development mode
`npm run build` for production mode
s
