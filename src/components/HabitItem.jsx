import {useHabitCheckoffs} from "../hooks/useHabitCheckoffs";
import {calculateStreak} from "../utils/streak";
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
        </li>
    )
}