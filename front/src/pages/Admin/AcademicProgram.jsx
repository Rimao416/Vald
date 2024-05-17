import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Datatable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAcademicPrograms,
  openModal,
} from "../../redux/slice/academicProgram";
import ModalHandleProgram from "../../components/modal/ModalHandleProgram";
import DataTableHeader from "../../components/DataTableHeader";
function AcademicProgram() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    // closeModal();
    dispatch(openModal());
    setModal(true);
  };
  useEffect(() => {
    dispatch(fetchAcademicPrograms());
  }, [dispatch]);
  const data = useSelector(
    (state) => state.academicProgramReducer.academicProgram
  );
  console.log(data);

  const columns = [
    {
      name: "Programme Académique",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Durée",
      selector: (row) => row.duration,
      sortable: true,
    },
  ];
  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredAcademicPrograms = data?.filter((row) => {
    const nameMatch = row.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch;
  });

  return (
    <MainLayout>
      <DataTableHeader
        buttonText=" Ajouter un nouveau programme"
        handleFilter={handleFilter}
        onClick={handleModal}
      />

      <div className="datatable__grade">
        <Datatable
          columns={columns}
          data={filteredAcademicPrograms}
          selectableRows
          pagination
        />
      </div>
      {modal && (
        <ModalHandleProgram onClose={() => setModal(false)} modal={modal} />
      )}
    </MainLayout>
  );
}

export default AcademicProgram;
