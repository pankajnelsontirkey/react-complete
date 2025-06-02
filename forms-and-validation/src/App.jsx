import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import LoginWithState from './components/Login-withState.jsx';
import Signup from './components/Signup.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Login /> */}
        {/* <LoginWithState /> */}
        <Signup />
      </main>
    </>
  );
}

export default App;
