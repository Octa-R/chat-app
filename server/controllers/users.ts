import { firestore } from "../db";
const usersCollection = firestore.collection("users");

const userSignUp = async (req, res) => {
  const { email, name } = req.body;

  const search = await usersCollection
    .where("email", "==", email.toLowerCase())
    .get();

  if (search.empty) {
    const newUserRef = await usersCollection.add({
      email: email.toLowerCase(),
      name: name,
    });
    res.json({ id: newUserRef.id, new: true });
  } else {
    res.status(400).json({ error: true, message: "user already exists" });
  }
};

const userAuth = async (req, res) => {
  const { email } = req.body;
  const search = await usersCollection
    .where("email", "==", email.toLowerCase())
    .get();

  if (search.empty) {
    res.status(404).json({ ok: false, message: "usuario no encontrado" });
  } else {
    res.json({ ok: true, id: search.docs[0].id });
  }
};

export { userAuth, userSignUp };
