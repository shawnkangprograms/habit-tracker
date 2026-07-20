import {useAuth} from './hooks/useAuth';
import {signOut} from 'firebase/auth';
import {auth} from './firebase';
import {AuthForm} from './components/AuthForm';
import {AddHabitForm} from './components/AddHabitForm';
import {useHabits} from './hooks/useHabits';
import {HabitList} from './components/HabitList';
import {useCheckoffs} from './hooks/useCheckoffs';

function App() {
  const { user, loading } = useAuth();
  const { habits, loading: habitsLoading, error} = useHabits(user?.uid);
  const { checkoffs, loading: checkoffsLoading} = useCheckoffs(user?.uid);
  // temporary debug log
  {/*console.log("Current logged-in uid:", user?.uid);*/}

  if (error) {
    return <div>Error loading habits: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user){
    return <AuthForm/>;
  }

  if (habitsLoading) {
    return <div>Loading habits...</div>
  }

  if (checkoffsLoading) {
    return <div>Loading checkoffs...</div>
  }

  return (
    <div>
      <h1>Welcome, {user.displayName || user.email}!</h1>
      <p>You are logged in.</p>
      <AddHabitForm user={user} />
      <button onClick={() => signOut(auth)}>Sign Out</button>
      <h2>Add a new habit!</h2>
      <HabitList habits={habits} uid={user.uid} checkoffs={checkoffs}/>
      {/*<button onClick={() => useCheckoffs}>Check Off</button>*/}
    </div>
  );
}

export default App;