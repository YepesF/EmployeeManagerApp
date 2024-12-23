import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Alert({ status, message, onClose }) {
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (!status) {
    return null;
  }

  return status === 'error' ? (
    <div
      role="alert"
      className="alert alert-error fixed bottom-0 right-10 z-50 max-w-xl -translate-y-10 transition ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  ) : (
    <div
      role="alert"
      className="alert alert-success fixed bottom-0 right-10 z-50 max-w-xl -translate-y-10 transition ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}

Alert.propTypes = {
  status: PropTypes.oneOf(['', 'error', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
