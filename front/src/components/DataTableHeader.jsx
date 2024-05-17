import MainButton from "./MainButton";
import { HiSearch } from "react-icons/hi";
import PropTypes from 'prop-types';
function DataTableHeader({
  buttonText,
  onClick,
  loading,
  handleFilter,
  children,
}) {
  return (
    <div className="datatable__header">
    <div className="datatable__header--left input--form">
      <span className="datatable__header--icon">
        <HiSearch />
      </span>

      <input
        type="text"
        name="search"
        placeholder="Rechercher quelque chose"
        className="form-control datatable__header--input"
        id=""
        onChange={handleFilter}
      />
    </div>
    <div className="datatable__header--right">
      <MainButton
        text={buttonText}
        onClick={onClick}
        loading={loading}
        classname="main-button"
      />
      {children}
    </div>
  </div>
  );
}
DataTableHeader.propTypes={
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  handleFilter: PropTypes.func,
  children: PropTypes.node
}


export default DataTableHeader;
