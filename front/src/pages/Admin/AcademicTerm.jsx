import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Datatable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  addAcademicTerm,
  fetchAcademicTerms,
} from "../../redux/slice/academicTermSlice";

import ModalHandleTerm from "../../components/modal/ModalHandleTerm";
import DataTableHeader from "../../components/DataTableHeader";
function AcademicTerm() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const handleTerm = () => {
    dispatch(addAcademicTerm());
  };
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAcademicTerms());
  }, [dispatch]);
  const data = useSelector((state) => state.academicTermReducer.academicTerm);
  console.log(data);
  const { loading } = useSelector((state) => state.academicTermReducer);
  console.log(loading);

  const columns = [
    {
      name: "Période Académique",
      selector: (row) => row.name,
      sortable: true,
    },
  ];
  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredAcademicTerms = data?.filter((row) => {
    const nameMatch = row.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch;
  });

  return (
    <MainLayout>
      <DataTableHeader
        buttonText=" Ajouter une nouvelle Période"
        handleFilter={handleFilter}
        onClick={handleTerm}
        loading={loading}
      />

      <div className="datatable__grade">
        <Datatable
          columns={columns}
          data={filteredAcademicTerms}
          selectableRows
          pagination
        />
      </div>
      {modal && (
        <ModalHandleTerm onClose={() => setModal(false)} modal={modal} />
      )}
    </MainLayout>
  );
}

export default AcademicTerm;
