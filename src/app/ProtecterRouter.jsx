import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { db } from "./firebase.jsx";
import { getDocs, collection } from "firebase/firestore";

export function ProtecterRouter({
  children,
  redirectTo = "/login",
  isAllowed = false,
}) {
  const { user, loading } = useAuth();

  // console.log(  verifyUserRol())
  if (loading) return <Loader />;

  if (!user) return <Navigate to={redirectTo} />;

  return <>{children}</>;
}
