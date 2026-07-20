import {toggleCheckoff} from "../utils/checkoff";

export function HabitList ({habits, uid, checkoffs}){
    if (!habits || habits.length === 0){
        return <p>No habits logged yet</p>
    }

    const handleToggle = async (habitId) => {
        //temporary console.log for debugging
        //console.log("Toggle clicked for habitId:", habitId, "uid:", uid);
        try{
            await toggleCheckoff(uid, habitId);
        } catch (err) {
            console.error("Error toggling checkoff:", err);
        }
    };

    return (
        <ul>
            {habits.map((habit) => {
            // Compute isCheckedOffToday for this habit using .some()
            const isCheckedOffToday = checkoffs.some((c) => c.habitId === habit.id);
            //temporary debug log
            {/*console.log("Habit:", habit.name, "habit.id", habit.id, "checkoffs", checkoffs, "isCheckedOffToday", isCheckedOffToday);*/}

                return (
                    <li key={habit.id}>
                        {/*
                        <p>Date: {habit.date.toDate().toLocaleDateString()} </p>
                        <p>Time: {habit.time.toTime().toLocaleTimeString()} </p>
                        <p>Description: {habit.notes}</p>
                        */}  
                        {/*None of the fields above exist on a habits document
                        habit only has uid, name, createdAt. No date, time, or notes*/}
                        <p>Name: {habit.name}</p>
                        <p>Created At: {habit.createdAt?.toDate().toLocaleTimeString()}</p>
                        <button onClick={() => handleToggle(habit.id)}>
                            {/* your job: show "Done today" or "Mark as done" depending on isCheckedOffToday */}
                            {isCheckedOffToday ? "Done today" : "Mark as done"}
                        </button>
                    </li>
                )
            })}
        </ul>    
    )
}