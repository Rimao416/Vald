import PropTypes from 'prop-types';
function FormGroup({ label, children }) {
  return (
    <>
      <label htmlFor={label} className="auth__form--label label">
        {label}
      </label>
      {children}
    </>
  );
}


FormGroup.propTypes={
  label: PropTypes.string,
  children: PropTypes.node
}

export default FormGroup;
