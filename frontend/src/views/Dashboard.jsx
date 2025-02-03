import Nav from "../components/Nav/Nav.jsx";
import Card from "../components/Card/Card.jsx";
import { useAuth } from "../context/authContext.jsx";
import Loader from "../components/Loader/Loader.jsx";



function Dashboard() {
  const { user, loading, haldleLogout } = useAuth();

  if (loading) return <Loader />;
 

  return (
    <>
      <Nav
        photo={user.photoURL}
        logOut={haldleLogout}
        name={user.displayName || user.email}
        display={false}
      />
      <Card />
    </>
  );
}

export default Dashboard;
