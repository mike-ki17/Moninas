import { useAuth } from "../context/authContext";
import Loader from "../components/Loader/Loader";
import { db } from "./firebase.jsx";
import { getDocs, collection } from "firebase/firestore";
import { useRef } from "react";

export function ProtecterRouterAdmin({ children, redirectTo = "/admin" }) {
  const { user, loading } = useAuth();
  const userRef = collection(db, "users");

  const userSnap = getDocs(useRef);
  console.log(userSnap.data());

  if (loading) return <Loader />;
  if (!user) return <Navigate to={redirectTo} />;

  return <>{children}</>;
}

// export default ProtecterRouterAdmin;
