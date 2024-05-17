
function Select({ name, handleChange, children }) {
  return (
    <select
      className="auth__form--input input--form u-margin-top-small"
      name={name}
      onChange={handleChange}
    >
      {children}
    </select>
  );
}

export default Select;
