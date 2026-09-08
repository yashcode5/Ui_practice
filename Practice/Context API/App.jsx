import UserProvider from "./UserProvider";

const App = () => {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}

export default App;
