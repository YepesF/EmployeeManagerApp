import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { state } = useAuth();
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
            {state?.user?.role === 'admin' && (
              <li>
                <a>Empleados</a>
              </li>
            )}
            <li>
              <a>Solicitudes</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">EmployeeManagerApp</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {state?.user?.role === 'admin' && (
            <li>
              <a>Empleados</a>
            </li>
          )}
          <li>
            <a>Solicitudes</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;