import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Datatable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  fetchAcademicYears,
  openModal,
} from "../../redux/slice/academicYearSlice";
import ModalHandleAcademicYear from "../../components/modal/ModalHandleAcademicYear";
import DataTableHeader from "../../components/DataTableHeader";
function AcademicYear() {
  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch(openModal());
    setModal(true);
  };

  useEffect(() => {
    dispatch(fetchAcademicYears());
    // console.log("Je lance")
  }, [dispatch]);

  const data = useSelector((state) => state.academicYearReducer.academicYear);
  // const { loading } = useSelector(
  //   (state) => state.academicYearReducer
  // );

  console.log(data);
  // console.log(data);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedRows, setSelectedRows] = React.useState([]);
  const columns = [
    {
      name: "Année Académique",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Période",
      selector: (row) =>
        moment(row.fromYear).format("DD/MM/YYYY") +
        " - " +
        moment(row.toYear).format("DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Date de création",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Nombre d'étudiants",
      selector: () => Math.floor(Math.random(0, 100) * 140),
      sortable: true,
    },
    {
      name: "Nombre d'enseignants",
      selector: () => Math.floor(Math.random(0, 100) * 140),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button className="btn" onClick={() => handleVoirPlus(row)}>
          Voir plus
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const [modal, setModal] = useState(false);
  const handleVoirPlus = (row) => {
    console.log(row);
  };
  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAcademicYears = data?.filter(
    (row) => {
      const nameMatch = row.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const periodMatch =
        moment(row.fromYear).format("DD/MM/YYYY").includes(searchQuery) ||
        moment(row.toYear).format("DD/MM/YYYY").includes(searchQuery);
      const createAtMatch = moment(row.createdAt)
        .format("DD/MM/YYYY")
        .includes(searchQuery);

      return nameMatch || periodMatch || createAtMatch;
    }
    // row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
    <DataTableHeader buttonText="Ajouter une année" handleFilter={handleFilter} onClick={handleModal} />
      <div className="datatable__grade">
        <Datatable
          columns={columns}
          data={filteredAcademicYears}
          selectableRows
          pagination
        />
      </div>
      {modal && (
        <ModalHandleAcademicYear
          onClose={() => setModal(false)}
          modal={modal}
        />
      )}
    </MainLayout>
  );
}

export default AcademicYear;
