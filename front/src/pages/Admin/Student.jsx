import DataTable from "react-data-table-component";
import DataTableHeader from "../../components/DataTableHeader";
import MainLayout from "../../layout/MainLayout";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { assetsURL } from "../../config";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import View from "../../components/View";
import {
  fetchAcademicStudents,
  updateAcademicStudent,
} from "../../redux/slice/adminStudentSlice";

function Student() {
  const navigate = useNavigate();
  const [isTableView, setIsTableView] = useState(true);
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.academicStudentReducer.academicStudents
  );
  const dataView = useSelector((state) => state.academicStudentReducer);
  console.log(dataView);

  console.log(data);
  const [searchQuery, setSearchQuery] = useState("");
  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchAcademicStudents());
  }, [dispatch]);

  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      width: "100px",
    },

    {
      name: "Nom Complet",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >{`${row.name} ${row.lastname}`}</div>
        </div>
      ),
    },
    {
      name: "Sexe",
      selector: (row) => row.sexe,
      sortable: true,
      width: "80px",
    },
    {
      name: "Mail",
      selector: (row) => row.email,

      sortable: true,
      width: "200px",
    },
    {
      name: "Téléphone",
      selector: (row) => row.phoneNumber,
      width: "140px",

      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "140px",

      sortable: true,
    },
    {
      name: "Adresse de residence",
      selector: (row) => row.adresse,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            className="datatable_button datatable_button--primary"
            onClick={() => navigate(`/admin/student/edit/${row._id}`)}
          >
            <AiOutlineEye />
          </span>
          <span
            className="datatable_button datatable_button--primary"
            onClick={() => {
              const message = `Voulez-vous vraiment ${
                row.status == "Confirmé" ? "bloquer" : "confirmer"
              } ce professeur ?`;
              const confirmed = window.confirm(message);
              if (confirmed) {
                dispatch(
                  updateAcademicStudent({
                    id: row._id,
                    status: row.status == "Confirmé" ? "Bloqué" : "Confirmé",
                    _id: row._id,
                  })
                ).then((res) => {
                  if (
                    res.type === "academicTerms/updateAcademicStudent/fulfilled"
                  ) {

                    window.location.href = "/admin/students";
                  }
                });
              }
            }}
          >
            <CiSettings />
          </span>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
  ];

  const filteredAcademicYears = data?.filter(
    (row) => {
      console.log(row);
      const nameMatch = row?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const lastnameMatch = row?.lastname
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const sexeMatch = row?.sexe
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const statusMatch = row?.status
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const createAtMatch = moment(row.createdAt)
        .format("DD/MM/YYYY")
        .includes(searchQuery);

      return (
        nameMatch || lastnameMatch || sexeMatch || statusMatch || createAtMatch
      );
    }
    // row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <MainLayout>
      <DataTableHeader
        buttonText={"Ajouter un étudiant"}
        handleFilter={handleFilter}
        onClick={() => navigate("/admin/student/add")}
      ></DataTableHeader>

      {isTableView ? (
        <div className="datatable__grade">
          <DataTable
            columns={columns}
            data={filteredAcademicYears}
            selectableRows
            pagination
          />
        </div>
      ) : (
        <div className="view">
          {filteredAcademicYears?.map((row) => (
            <>
              <View image={`${assetsURL}/img/users/${row.photo}`}>
                <h3>
                  {row.name} {row.lastname}
                </h3>
                <p>{row.email}</p>
              </View>
            </>
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default Student;
