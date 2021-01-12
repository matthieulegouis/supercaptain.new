const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { google } = require("googleapis");
const nodemailer = require('nodemailer');

// Init App
admin.initializeApp(functions.config());

const OAuth2 = google.auth.OAuth2;
const db = admin.firestore();
const auth = admin.auth();

// Set Nodemailer
const myOAuth2Client = new OAuth2(
  "966020267100-pf8m4ba85e115259kk8grljo06p58ki5.apps.googleusercontent.com",
  "nHaR2_SINhEZUsx23gFYTx-h",
  "https://developers.google.com/oauthplayground"
);

// Set Credentials for Gmail
myOAuth2Client.setCredentials({
  refresh_token:"1//04i-A5BoP2m6iCgYIARAAGAQSNwF-L9Ir3pb9_0EARCsU3ivyjM1qcq9fk61k-Cb4o_pEKzVeUodjwqyDyJviV7tuF1Z8WR42HD4"
});

const myAccessToken = myOAuth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "matthieu.legouis@gmail.com",
    clientId: "966020267100-pf8m4ba85e115259kk8grljo06p58ki5.apps.googleusercontent.com",
    clientSecret: "nHaR2_SINhEZUsx23gFYTx-h",
    refreshToken: "1//04i-A5BoP2m6iCgYIARAAGAQSNwF-L9Ir3pb9_0EARCsU3ivyjM1qcq9fk61k-Cb4o_pEKzVeUodjwqyDyJviV7tuF1Z8WR42HD4",
    accessToken: myAccessToken,
  }
});

// ---------------------------------------- Utils
// Check Format Email
const checkFormatEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// Check Format Username
const checkFormatUsername = (username) => {
  if ((username.length > 5) && (username.length < 31)) {
    const re = /^[0-9a-zA-Z_.-]+$/;
    return re.test(String(username).toLowerCase());
  }
  return false;
};
// Check Format Password
const checkFormatPassword = (password) => {
  if (password.length > 4) return true;
  return false;
}

// Check Username Uniqueness
const checkUsernameUniqueness = async (username) => {
  const doc = await db.collection('usernames').doc(username).get();
  return new Promise((resolve, reject) => {
    if (doc.exists) return reject(new Error('username_not_available'));
    return resolve(username);
  });
};

// Check Username Last Update
const checkUsernameLastUpdate = async (userId) => {
  const doc = await db.collection('users').doc(userId).get();
  return new Promise((resolve, reject) => {
    if (doc.exists) {
      // Check the latest update
      if (doc.data().usernameLastUpdate
      && doc.data().usernameLastUpdate.newest
      && doc.data().usernameLastUpdate.oldest) {
        const now = Math.floor(Date.now());
        const dateOldest = 1000 * ((doc.data().usernameLastUpdate.oldest)._seconds);
        // Authorize twice over 30 rolling days (2592000000ms)
        if (now > dateOldest + 2592000000) {
          return resolve(doc.data().usernameLastUpdate.newest);
        } else {
          return reject(new Error('username_authorize_only_twice_update_over_30_rolling_days'));
        }
      } else {
        // First time the user update the username
        const oldDate = new Date(1970, 0, 1, 0, 0, 0, 0);
        const newestUpdate = admin.firestore.Timestamp.fromDate(oldDate);
        return resolve(newestUpdate);
      }
    } else return reject(new Error('username_not_available'));
  });
};

// Check Email Uniqueness
const checkEmailUniqueness = async (email) => {
  const doc = await db.collection('emails').doc(email).get();
  return new Promise((resolve, reject) => {
    if (doc.exists) return reject(new Error('email_not_available'));
    return resolve(email)
  });
};

// Check Email Uniqueness Server Side
const checkEmailUniquenessServerSide = (email) => {
  return new Promise(async (resolve, reject) => {
    return auth.getUserByEmail(email)
      .then(() => {
        return reject(new Error('email_not_available'));
      })
      .catch(() => {
        return resolve(email);
      });
  });
};
// Check Email Last Update
const checkEmailLastUpdate = async (userId) => {
  const doc = await db.collection('users').doc(userId).get();
  return new Promise((resolve, reject) => {
    if (doc.exists) {
      // Check the latest update
      if (doc.data().emailLastUpdate
      && doc.data().emailLastUpdate.newest
      && doc.data().emailLastUpdate.oldest) {
        const now = Math.floor(Date.now());
        const dateOldest = 1000 * ((doc.data().emailLastUpdate.oldest)._seconds);
        // Authorize twice over 30 rolling days (2592000000ms)
        if (now > dateOldest + 2592000000) {
          return resolve(doc.data().emailLastUpdate.newest);
        } else {
          return reject(new Error('email_authorize_only_twice_update_over_30_rolling_days'));
        }
      } else {
        // First time the user update the email
        const oldDate = new Date(1970, 0, 1, 0, 0, 0, 0);
        const newestUpdate = admin.firestore.Timestamp.fromDate(oldDate);
        return resolve(newestUpdate);
      }
    } else return reject(new Error('username_not_available'));
  });
};
// Update Account
const updateAccount = (userId, payload) => {
  return new Promise(async (resolve, reject) => {
    return await auth.updateUser(userId, payload)
      .then(() => {
        return resolve();
      })
      .catch(() => {
        return reject(new Error('account_not_updated'));
      })
  });
}
// Verify code
const verifyCode = async (email, userCode) => {
  const docRef = db.collection('codes').doc(email);
  const doc = await db.collection('codes').doc(email).get();
  return new Promise((resolve, reject) => {
    if (doc.exists) {
      // Check that the code is correct
      if (String(userCode) === String(doc.data().code)) {
        // Check that the code has not expired
        const now = Math.floor(Date.now());
        const dateCode = 1000 * ((doc.data().date)._seconds);
        // Set 1h of validity
        const periodOfValidity = 3600000;
        if (now < dateCode + periodOfValidity) {
          // Delete document
          return docRef.delete()
            .then(() => {
              return resolve();
            })
            .catch(() => {
              return reject(new Error('code_deletion_failure'));
            })
        } else return reject(new Error('code_expired'));
        // Delete code
      } else return reject(new Error('code_incorrect'));
    } else return reject(new Error('code_not_found'));
  });
}

// ---------------------------------------- Update Username
exports.updateUsername = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const username = data.username.trim().toLowerCase();
  const usernameRef = db.collection('usernames').doc(username);
  const usernameQuery = db.collection('usernames').where('uid', '==', userId);
  const userRef = db.collection('users').doc(userId);

  if (checkFormatUsername(username)) {
    return checkUsernameLastUpdate(userId)
      .then((newestUpdate) => {
        return db.runTransaction(async (transaction) => {
          // Checj uniqueness
          return checkUsernameUniqueness(username)
          // Query usernames  
          .then(() => transaction.get(usernameQuery))
          // Ensure user only has one username by deleting any references found
          .then((querySnapshot) => {
            return Promise.all(querySnapshot.docs.map(doc => transaction.delete(doc.ref)));
          })
          // Assign the username to the authenticated user
          .then(() => transaction.set(usernameRef, { uid: userId }, { merge: true }))
          // Write the new username to the user profile
          .then(() => {
            const now = new Date();
            return transaction.update(userRef, {
              username: username,
              usernameLastUpdate: {
                newest: admin.firestore.Timestamp.fromDate(now),
                oldest: newestUpdate,
              },
            })
          });
        });
      })
      .catch((error) => {
        throw new functions.https.HttpsError('internal', error.message);
      })
  } else {
    throw new functions.https.HttpsError('invalid-argument', 'username_incorrect');
  }
});

// ---------------------------------------- Update Email
exports.updateEmail = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const email = data.email;
  const emailRef = db.collection('emails').doc(email);
  const emailQuery = db.collection('emails').where('uid', '==', userId);
  const userRef = db.collection('users').doc(userId);
  if (checkFormatEmail(email)) {
    return checkEmailLastUpdate(userId)
      .then((newestUpdate) => {
        return db.runTransaction(async (transaction) => {
          return checkEmailUniqueness(email)
          // Check if email is already assigned server side
          .then(() => checkEmailUniquenessServerSide(email))
          // Query usernames  
          .then(() => transaction.get(emailQuery))
          // Ensure user only has one email by deleting any references found
          .then((querySnapshot) => {
            return Promise.all(querySnapshot.docs.map(doc => transaction.delete(doc.ref)));
          })
          // Assign the email to the authenticated user
          .then(() => transaction.set(emailRef, { uid: userId }, { merge: true }))
          // Write to the user profile
          .then(() => {
            const now = new Date();
            return transaction.update(userRef, {
              emailLastUpdate: {
                newest: admin.firestore.Timestamp.fromDate(now),
                oldest: newestUpdate,
              },
            })
          })
          // Update the account
          .then(() => {
            return updateAccount(userId, { email, emailVerified: true,});
          })
        });
      })
      .catch((error) => {
        throw new functions.https.HttpsError('internal', error.message);
      })
  } else {
    throw new functions.https.HttpsError('invalid-argument', 'email_incorrect');
  }
});

// ---------------------------------------- Sign Up
exports.signUp = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const userCode = data.code;
  const username = data.username.trim().toLowerCase();
  const password = data.password;
  const fullname = data.fullname;
  const birthday = data.birthday;
  const language = data.language;
  if (checkFormatEmail(email) && checkFormatUsername(username) && checkFormatPassword(password)) {
    return checkEmailUniquenessServerSide(email)
      .then(() => checkEmailUniqueness(email))
      .then(() => checkUsernameUniqueness(username))
      .then(() => verifyCode(email, userCode))
      // Create user
      .then(() => {
        return admin.auth().createUser({
          email,
          emailVerified: true,
          password,
          displayName: username,
        });
      })
      // Create profile
      .then((userRecord) => {
        const batch = db.batch();
        const userRef = db.collection('users').doc(userRecord.uid);
        const usernameRef = db.collection('usernames').doc(username);
        const emailRef = db.collection('emails').doc(email);
        batch.set(userRef, {
          username,
          fullname,
          language,
          birthday,
        });
        batch.set(usernameRef, { uid: userRecord.uid });
        batch.set(emailRef, { uid: userRecord.uid });
        return batch.commit()
      })
      .catch((error) => {
        throw new functions.https.HttpsError('internal', error.message);
      })
  } else {
    throw new functions.https.HttpsError('invalid-argument', 'data_sign_up_incorrect');
  }
});

// ---------------------------------------- Send verification code
exports.sendVerificationCode = functions.https.onCall(async (data, context) => {
  // Generate a code and save it in the database
  const email = data.email;
  const code = Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  return await db.collection('codes').doc(email).set({
    code: code,
    date: admin.firestore.Timestamp.fromDate(now),
  })
    .then(async () => {
      // Send the email
      const mailOptions = {
        from: 'Supercaptain',
        to: email,
        subject: `${code} is your Supercaptain code`,
        html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html>
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <style>
                body {
                  color: #444444;
                }
                .wrapper {
                  width: 400px;
                  padding: 30px;
                  margin-left: auto;
                  margin-right: auto;
                  border: 1px solid #CCC;
                  border-radius: 30px;
                }
                .code {
                  font-size: 30px;
                  font-weight: 700;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <h3>Supercaptain</h3>
                <p>Hi, Someone tried to sign up for an Supercaptain account with ${email}. If it was you, enter this confirmation code in the app.</p>
                <div class="code">${code}</div>
              </div>
            </body>
          </html>
        `
      };
      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new functions.https.HttpsError('internal', 'email_with_verification_code_not_sent');
        }
        return 'email_with_verification_code_sent';
      });
    })
    .catch((error) => {
      throw new functions.https.HttpsError('internal', error);
    })
});

// ---------------------------------------- Verify code
exports.verifyCode = functions.https.onCall(async (data, context) => {
  const email = data.email;
  const userCode = data.code;
  return verifyCode(email, userCode)
    .then(() => 'code_ok')
    .catch((error) => {
      throw new functions.https.HttpsError('internal', error.message);
    })
});

// ---------------------------------------- Delete User
exports.deleteUser = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;
  const username = context.auth.token.name;
  const email = context.auth.token.email;
  const usernameRef = db.collection('usernames').doc(username);
  const emailRef = db.collection('emails').doc(email);
  const userRef = db.collection('users').doc(userId);
  const batch = db.batch();
  batch.delete(usernameRef);
  batch.delete(emailRef);
  batch.delete(userRef);
  batch.commit()
    .then(() => auth.deleteUser(userId))
    .catch((error) => {
      throw new functions.https.HttpsError('internal', error.message);
    })
});

// ---------------------------------------- Update skill across the database when a skill is updated
exports.updateSkill = functions.firestore.document('skills/{skillId}').onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const skillId = context.params.skillId;
  const title = newValue.title;
  const image = newValue.image;

  // Search inside the collection "users/{userId}/skills" of all users
  const usersRef = db.collection('users');
  const snapshotUsers = await usersRef.get();
  snapshotUsers.forEach(async (doc) => {
    const userRef = db.collection('users').doc(doc.id).collection('skills');
    const snapshotUser = await userRef.get();
    snapshotUser.forEach((doc) => {
      if (doc.id === skillId) {
        return doc.ref.update({
          title,
          image,
        });
      }
      return false;
    });
  });
});

// ---------------------------------------- Delete skill across the database when a skill is deleted
exports.deleteSkill = functions.firestore.document('skills/{skillId}').onDelete(async (change, context) => {
  const skillId = context.params.skillId;

  // Search inside the collection "users/{userId}/skills" of all users
  const usersRef = db.collection('users');
  const snapshotUsers = await usersRef.get();
  snapshotUsers.forEach(async (doc) => {
    const userRef = db.collection('users').doc(doc.id).collection('skills');
    const snapshotUser = await userRef.get();
    snapshotUser.forEach((doc) => {
      if (doc.id === skillId) {
        return doc.ref.delete();
      }
      return false;
    });
  });
});
