import {useHabitCheckoffs} from "../hooks/useHabitCheckoffs";
import {calculateStreak} from "../utils/streak";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import "react-calendar-heatmap/dist/styles.css";
import CalendarHeatmap from "react-calendar-heatmap";

export function HabitItem({habit, uid, isCheckedOffToday, onToggle}) {
    const {habitCheckoffs} = useHabitCheckoffs(uid, habit.id);
    const streak = calculateStreak(habitCheckoffs);

    //WRONG - date doesn't exist as a standalone variable and
    //[{date: "...", count 1}] is a hardcoded array, not a transformation 

    {/*date.toISOString().split("T")[0];
    [{date: "...", count: 1} ]*/}

    //CORRECT 
    const heatmapData = habitCheckoffs.map((c) => ({
        date: c.date.toDate().toISOString().split("T")[0],
        count: 1,
    }));

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    //WRONG - handleDelete isn't a function, it's a single, immediately executed expression
    // It should be a fxn you call later when the button is clicked, not immediatelely when the component renders
    {/*const handleDelete = doc(db, "habits", habit.id);
    //WRONG - await is outside an async function (await can only be used inside an async fxn)
    // await doc(docRef)+deleteDoc();*/}

    //CORRECT
    const handleDelete = async () => {
        try {
            const docRef = doc(db, "habits", habit.id);
            await deleteDoc(docRef);
        } catch (err) {
            console.error("Error deleting habit:", err);
        }
    };

    return (
        <li>
            <p>Name: {habit.name}</p>
            <p>Current streak: {streak} days </p>
            <CalendarHeatmap
                startDate = {sixMonthsAgo}
                endDate = {new Date()}
                values={heatmapData}
            />         
            <button onClick={() => onToggle(habit.id)}>
                {isCheckedOffToday ? "Done today" : "Mark as done"}
            </button>
            
            {/*
             WRONG - delete fxn wired to wrong fxn -> onToggle() instead of handleDelete()
             fxn references isDeleted, a variable that doesn't exist anywhere in this file
            <button onClick={() => onToggle(habit.id)}>
                 WRONG - Delete button dosn't need conditional text - deleting isn't a
                 toggle state like checking off is; it's a one-way action
                {isDeleted ? "Delete" : "Keep"}
            </button>
            */}
            
            {/*CORRECT*/}
            <button onClick={handleDelete}>Delete Habit</button>
        </li>
    );
}