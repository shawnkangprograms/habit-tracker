import {useState, useEffect} from "react";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";

export function useHabits(uid) {
    const[habits, setHabits] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState (null);

    useEffect(() => {
        if (!uid){
            //if no uid is provided, clear habits and set loading to false
            setHabits([]); //Error: Calling state synchronously within an effect can trigger cascading errors
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, "habits"),
            where('uid', '==', uid),
            //orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            //build an array on plain objects from snapshot.doc
            //call setHabits(habitsData) with it to update habits state with the new data
            const habitsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setHabits(habitsData);
            setLoading(false);
        },  (error) => {
            console.error("Error fetching habits:", error);
            setError(error);
            setLoading(false);
        });

        return unsubscribe;
    }, [uid]);

    return{habits, loading, error};
}