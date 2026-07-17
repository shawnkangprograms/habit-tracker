export function HabitList ({habits}){
    if (!habits || habits.length === 0){
        return <p>No habits logged yet</p>
    }

    return (
        <ul>
            {habits.map((habit) => (
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
                </li>
            ))}
        </ul>    
    )
}