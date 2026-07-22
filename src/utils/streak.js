export function calculateStreak(habitCheckoffs) {
    //Step 1: build a set of date strings for fast lookup
    const checkedDates = new Set(
        habitCheckoffs.map((c) => c.date.toDate().toDateString())
    );

    //Step 2: Walk backward from today, counting consecutively
    let streak = 0;
    let current = new Date();

    // If today is NOT in checkedDates, move 'current' back one day
    // use the same .setDate(.getDate() - 1) pattern
    if (!checkedDates.has(current.toDateString())){
        current.setDate(current.getDate() - 1);
    }

    // The while loops continue-condition, using checkedDates and current
    while(checkedDates.has(current.toDateString())){
        streak++;
        // move "current" back one day
        current.setDate(current.getDate() - 1);
    }

    return streak;
}