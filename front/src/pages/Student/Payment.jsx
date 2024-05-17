import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datatable from "react-data-table-component";
import MainLayout from "../../layout/MainLayout";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { fetchClassLevels, openModal } from "../../redux/slice/classSlice";
import ModalHandleClass from "../../components/modal/ModalHandleClass";
import DataTableHeader from "../../components/DataTableHeader";
import { getMyAcademicPayments } from "../../redux/slice/paymentSlice";
function Payment() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const columns = [
    {
      name: "Niveau Académique",
      selector: (row) => row.amount,
      sortable: true,
    },

    {
      name: "Date de création",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
    },

   
  ];
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyAcademicPayments()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);
  const data = useSelector(
    (state) => state.academicPaymentsReducer.academicPayment
  );
  console.log(data);

  const handleFilter = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredClassLevel = data?.filter(
    (row) => {
      console.log(row)
      const nameMatch = row.amount
     
      return nameMatch;
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
        buttonText="Ajouter un paiement"
        handleFilter={handleFilter}
        onClick={() => navigate("/payment/create")}
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

export default Payment;
