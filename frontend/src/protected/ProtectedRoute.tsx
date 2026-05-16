import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/dispatch"

const ProtectedRoute = () => {

  const {accessToken, status} = useAppSelector((state) => state.auth)

  if (status === "checking") {
    return null;
  }

  const isAuthenticated = Boolean(accessToken) && status === "authenticated"

  if (!isAuthenticated){
    return <Navigate to={'/login'} replace/>
  }

  return <Outlet/>

}

export default ProtectedRoute;
