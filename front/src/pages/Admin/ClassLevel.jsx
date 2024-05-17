import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datatable from "react-data-table-component";
import MainLayout from "../../layout/MainLayout";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import {Link} from "react-router-dom"
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { fetchClassLevels, openModal } from "../../redux/slice/classSlice";
import ModalHandleClass from "../../components/modal/ModalHandleClass";
import DataTableHeader from "../../components/DataTableHeader";
function ClassLevel() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const columns = [
    {
      name: "Niveau Académique",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Date de création",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            className="datatable_button datatable_button--primary"
            onClick={() => console.log("Bonjour")}
          >
            <AiOutlineEye />
          </span>

          <Link
            to={`edit/${row._id}`}
            className="datatable_button datatable_button--secondary"
            onClick={() => console.log("Bonjour")}
          >
            <AiOutlineEdit />
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
  ];
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClassLevels());
  }, [dispatch]);
  const data = useSelector((state) => state.classLevelReducer.classLevel);
  console.log(data);

  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredClassLevel = data?.filter(
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
  const handleModal = () => {
    dispatch(openModal());
    setModal(true);
  };
  return (
    <MainLayout>
      <DataTableHeader
        buttonText="Ajouter un Niveau"
        handleFilter={handleFilter}
        onClick={() => navigate("/admin/class/create")}
      />
      <div className="datatable__grade">
        <Datatable
          columns={columns}
          data={filteredClassLevel}
          selectableRows
          pagination
        />
      </div>
      {modal && (
        <ModalHandleClass onClose={() => setModal(false)} modal={modal} />
      )}
    </MainLayout>
  );
}

export default ClassLevel;
