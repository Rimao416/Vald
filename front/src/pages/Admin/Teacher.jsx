import DataTable from "react-data-table-component";
import DataTableHeader from "../../components/DataTableHeader";
import MainLayout from "../../layout/MainLayout";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicTeacher } from "../../redux/slice/adminTeacherSlice";
import moment from "moment";
import { assetsURL } from "../../config";
import { AiOutlineTable } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { VscListUnordered } from "react-icons/vsc";
import View from "../../components/View";

function Teacher() {
  const navigate = useNavigate();
  const [isTableView, setIsTableView] = useState(true);
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.academicTeacherReducer.academicTeacher
  );
  console.log(data);
  const [searchQuery, setSearchQuery] = useState("");
  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchAcademicTeacher());
  }, []);

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
          <div>
            {
              <img
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                src={`${assetsURL}/img/users/${row.photo}`}
                alt={`Photo de ${row.name}`}
              />
            }
          </div>
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
      name: "Adresse de residence",
      selector: (row) => row.adresse,
      sortable: true,
    },
    {
      name: "Actions",
      cell: () => (
        <span
          className="datatable_button datatable_button--primary"
          onClick={() => console.log("Bonjour")}
        >
          <AiOutlineEye />
        </span>
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
        buttonText={"Ajouter un enseignant"}
        handleFilter={handleFilter}
        onClick={() => navigate("/admin/teacher/add")}
      >
        <div className="display">
          <span
            className={`display__view ${isTableView === false ? "active" : ""}`}
            onClick={() => setIsTableView(false)}
          >
            <VscListUnordered />
          </span>
          <span
            className={`display__table ${isTableView ? "active" : ""}`}
            onClick={() => setIsTableView(true)}
          >
            <AiOutlineTable />
          </span>
        </div>
      </DataTableHeader>

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

export default Teacher;
