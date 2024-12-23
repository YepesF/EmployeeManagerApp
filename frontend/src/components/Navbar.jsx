import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { state, dispatch } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className="navbar fixed top-0 bg-base-100/80 shadow-lg backdrop-blur-sm">
      <div className="navbar-end w-full justify-between lg:navbar-start lg:w-full">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link to="/dashboard">Solicitudes</Link>
            </li>
            {state?.user?.role === 'admin' && (
              <li>
                <Link to="/dashboard/employees">Empleados</Link>
              </li>
            )}
          </ul>
        </div>
        <Link className="text-xl">EmployeeManagerApp</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center justify-center gap-4 px-2">
          <li>
            <Link to="/dashboard" className="link-hover link">
              Solicitudes
            </Link>
          </li>
          {state?.user?.role === 'admin' && (
            <li>
              <Link to="/dashboard/employees" className="link-hover link">
                Empleados
              </Link>
            </li>
          )}
          <li>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar placeholder btn btn-circle btn-ghost"
              >
                <div className="w-8 rounded-full bg-neutral text-neutral-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
