import { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicSubjects } from "../../redux/slice/academicSubject";
import DataTableHeader from "../../components/DataTableHeader";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { VscListUnordered } from "react-icons/vsc";
import { AiOutlineTable } from "react-icons/ai";
import Avatar from "react-avatar"
import View from "../../components/View";
function AcademicSubject() {
  const [isTableView, setIsTableView] = useState(true);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const data = useSelector(
    (state) => state.academicSubjectReducer.academicSubject
  );
  console.log(data);
  useEffect(() => {
    dispatch(fetchAcademicSubjects());
  }, [dispatch]);
  const columns = [
    {
      name: "Nom",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Période Académique",
      selector: (row) => row.academicTerm.name,
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
  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredAcademicSubject = data?.filter((row) => {
    const nameMatch = row.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const semesterMatch = row.academicTerm.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch || semesterMatch;
  });

  return (
    <MainLayout>
      <DataTableHeader
        buttonText={"Ajouter un nouveau cours"}
        handleFilter={handleFilter}
        onClick={() => {}}
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
          data={filteredAcademicSubject}
          selectableRows
          pagination
        />
      </div>
      ):(
        <div className="view">
        {filteredAcademicSubject?.map((row) => (
          <>
            <View type="avatar" image={<Avatar style={{width: "100px", height: "100px"}} name={row.name}/>}>
              <h3>
                {row.name} {row.lastname}
              </h3>
           
            </View>
          </>
        ))}
      </div>
      )}

    </MainLayout>
  );
}

export default AcademicSubject;
