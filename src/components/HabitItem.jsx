import {useHabitCheckoffs} from "../hooks/useHabitCheckoffs";
import {calculateStreak} from "../utils/streak";

export function HabitItem({habit, uid, isCheckedOffToday, onToggle}) {
    const {habitCheckoffs} = useHabitCheckoffs(uid, habit.id);
    const streak = calculateStreak(habitCheckoffs);

    return (
        <li>
            <p>Name: {habit.name}</p>
            <p>Current streak: {streak} days </p>
            <button onClick={() => onToggle(habit.id)}>
                {isCheckedOffToday ? "Done today" : "Mark as done"}
            </button>
        </li>
    )
}