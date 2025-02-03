import { useAuth } from "../context/authContext.jsx";

import Nav from "../components/Nav/Nav"
import FormContact from "../components/FormContact/FormContact.jsx";

function Contacto() {
   const { user, haldleLogout } = useAuth();
  return (
    <>
      <Nav
        photo={user.photoURL}
        logOut={haldleLogout}
        name={user.displayName || user.email}
        display={false}
      />
      <FormContact />


    </>
  )
}

export default Contacto