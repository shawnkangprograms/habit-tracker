import {useState, useEffect} from 'react';
import {collection, query, where, onSnapshot, Timestamp} from 'firebase/firestore';
import {db} from '../firebase';

export function useCheckoffs(uid) { 
    const [checkoffs, setCheckoffs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uid) {
            setCheckoffs([]); //Error: Calling setState synchronously within an effect can trigger cascading renders
            setLoading(false);
            return;
        }

        // build startOfToday and startOfTomorrow
        // same pattern as toggleCheckoff.js
        const startOfToday = new Date();
        startOfToday.setHours (0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        const q = query(
            collection(db, "checkoffs"),
            where("uid", "==", uid),
            // add the two date-range where() clauses
            where("date", ">=", Timestamp.fromDate(startOfToday)),
            where("date", "<", Timestamp.fromDate(startOfTomorrow))
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            // use same map pattern as useHabits
            const checkoffsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCheckoffs(checkoffsData); 
            setLoading(false);

        }, (error) => {
            console.error("Error fetching checkoffs:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [uid]);

    return {checkoffs, loading};
}