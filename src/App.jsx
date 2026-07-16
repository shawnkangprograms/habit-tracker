import {useAuth} from './hooks/useAuth';
import {signOut} from 'firebase/auth';
import {auth} from './firebase';
import {AuthForm} from './components/AuthForm';
import {AddHabitForm} from './components/AddHabitForm'

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user){
    return <AuthForm/>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName || user.email}!</h1>
      <p>You are logged in.</p>
      <AddHabitForm user={user} />
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </div>
  );
}

export default App;