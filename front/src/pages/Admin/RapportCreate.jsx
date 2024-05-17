import { useEffect, useState, useRef } from "react";
import FormGroup from "../../components/form/FormGroup";
import Input from "../../components/form/Input";
import MainLayout from "../../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";

import { addClassLevel } from "../../redux/slice/classSlice";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
function RapportCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.academicSubjectReducer);
  const paiements = useSelector(
    (state) => state.academicPaymentsReducer.academicPayment
  );
  console.log(paiements);

  useEffect(() => {
    if (status === "success") {
      navigate("/admin/subjects");
    }
  }, [status, navigate]);

  //   const { classLevel } = useSelector((state) => state.classLevelReducer);

  const [data, setData] = useState({
    dateDebut: "",
    dateFin: "",
  });

  const exportPDF = () => {
    console.log(data);
    const doc = new jsPDF();
    const columns = ["Amount", "Date"];
    const filteredData = paiements.filter((pay) => {
      const paiement = moment(pay.paymentDate, "DD/MM/YYYY"); // Convertir la date de décès en objet moment
      const dateDebut = moment(data.dateDebut, "DD/MM/YYYY"); // Convertir la date de début en objet moment
      const dateFin = moment(data.dateFin, "DD/MM/YYYY"); // Convertir la date de début en objet moment

      // Filtrer les utilisateurs dont la date de décès est dans la plage spécifiée
      return paiement.isBetween(dateDebut, dateFin, null, "[]"); // '[]' pour inclure les dates de début et de fin
    });
    console.log(filteredData);
    // const rows = paiements.map((data) => [data.amount,moment(data.paymentDate).format("DD/MM/YYYY")]);
    // console.log(rows)
    // doc.autoTable({
    //   head: [columns],
    //   body: rows,
    // });

    // // Télécharger le document PDF
    // doc.save("tableau_noms.pdf");
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    dispatch(addClassLevel({ name: data.name, frais: data.frais })).then(
      (res) => {
        // dispatch(addClassLevel(data));
        console.log(res);
        if (res.type === "classLevels/addClassLevel/fulfilled") {
          window.location.href = "/admin/class/";
        }
      }
    );

    // navigate("/admin/subjects");
    // console.log(data);
  };
  return (
    <MainLayout>
      <div className="form__layout--wrapper">
        <FormGroup label="Nom">
          <Input
            type="date"
            placeholder="Entrez le nom de la classe"
            name="dateDebut"
            onChange={handleChange}
          />
        </FormGroup>
        <p>{data.name}</p>
      </div>
      <div className="form__layout--wrapper">
        <FormGroup label="Frais">
          <Input
            type="date"
            placeholder="Entrez le frais"
            name="dateFin"
            onChange={handleChange}
          />
          {/* <Input
              type="text"
              name="frais"
            //   value={data.frais}
              handleChange={handleChange}
            /> */}
          {/* {_id && (
              <p>La période académique actuelle est {data.academicTerm.name}</p>
            )} */}
        </FormGroup>
      </div>
      <button className="btn" onClick={exportPDF}>
        Génerer le rapport
      </button>
      {/* 
        <MainButton
          text={_id ? "Modifier" : "Enregistrer"}
          isDisabled={false}
          type="submit"
          classname="main-button"
          loading={loading}
        /> */}
    </MainLayout>
  );
}

export default RapportCreate;
