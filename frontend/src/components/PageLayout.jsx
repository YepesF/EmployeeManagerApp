import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

function PageLayout({ children }) {
  const { state } = useAuth();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {state.isAuthenticated && <Navbar />}
        {children}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
