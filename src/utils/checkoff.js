import {collection, query, where, getDocs, addDoc, deleteDoc, doc, Timestamp, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";

export async function toggleCheckoff(uid, habitId) {
    const startOfToday = new Date();
    startOfToday.setHours (0, 0, 0, 0);

    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

    const q = query(
        collection(db, "checkoffs"),
        where("uid", "==", uid),
        where("habitId", "==", habitId),
        where("date", ">=", Timestamp.fromDate(startOfToday)),
        where("date", "<", Timestamp.fromDate(startOfTomorrow))
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        // No existing check-off for today — create one
        // what fields does a checkoff document need? (refer to your Stage 2 schema)
        await addDoc(collection(db, "checkoffs"),{
            uid: uid,
            habitId: habitId,
            date: Timestamp.fromDate(startOfToday),
            createdAt: serverTimestamp()
        })

        // your job: a check-off already exists — delete it
        // hint: snapshot.docs[0] gives you the first (and only) matching doc.
        // Firestore's deleteDoc() needs a "document reference", not just an ID —
        // look up how `doc()` is used to build one from a collection + an id.
    } else {
        const docRef = doc(db, "checkoffs", snapshot.docs[0].id);
        await deleteDoc(docRef)
    };
    
}