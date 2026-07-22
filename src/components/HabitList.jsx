import {toggleCheckoff} from "../utils/toggleCheckoff";
import {HabitItem} from "./HabitItem";

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
                    <HabitItem
                        key = {habit.id}
                        habit={habit}
                        uid={uid}
                        isCheckedOffToday = {isCheckedOffToday}
                        onToggle={handleToggle} 
                    />
                )
            })}
        </ul>    
    )
}