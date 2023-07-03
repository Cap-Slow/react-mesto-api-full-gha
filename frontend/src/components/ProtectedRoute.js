import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/sign-in" replace />;
}

export default ProtectedRoute;
