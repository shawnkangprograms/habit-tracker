import {useState} from "react";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";

export function AddHabitForm({user}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        //what should happen when 'name' is empty or just whitespace? It should reject the name
        //think about .trim() - what does it do to a string like " "? Removes whitespace from beginning and end of a string
        const trimmedName = name.trim();
        if (trimmedName.length === 0){
            setError("Habit name cannot be empty.")
            return;
        }

        setSubmitting(true);
        try{
            await addDoc(collection(db, "habits"), {
                //which fields does a habit document need? uid, name, createdAt
                //refer to schema locked in stage 2
                uid: user.uid,
                name: trimmedName,
                createdAt: serverTimestamp(),
            });

            setName("");    
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a habit</h3>
            {error && <p style={{color:"red"}}>{error}</p>}
            <input
                type="text"
                placeholder="Habit name (e.g. Drink water)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit" disabled={submitting}>
                {submitting ? "Adding..." : "Add Habit"}
            </button>
        </form>
    );
} 