import {useState, useEffect} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase';

export function useHabitCheckoffs(uid, habitId) {
    const [habitCheckoffs, setHabitCheckoffs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid) {
            setHabitCheckoffs([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "checkoffs"),
            where("uid", "==", uid),
            where("habitId", "==", habitId)
        );

        const unsubscribe = onSnapshot (q, (snapshot) => {
            const habitCheckoffsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setHabitCheckoffs(habitCheckoffsData);
            setLoading(false);

        }, (error) => {
            console.error("Error fetching checkoffs:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [uid, habitId]);

    return {habitCheckoffs, loading}
}