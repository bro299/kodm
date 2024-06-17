const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.searchKhodam = functions.https.onRequest(async (req, res) => {
  const searchTerm = req.query.term;

  try {
    const khodamsRef = admin.firestore().collection('khodams');
    const snapshot = await khodamsRef.where('name', '==', searchTerm).get();

    if (snapshot.empty) {
      res.status(404).json({ error: 'Khodam not found' });
      return;
    }

    const khodam = snapshot.docs[0].data();
    res.status(200).json(khodam);
  } catch (error) {
    console.error('Error searching khodam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
