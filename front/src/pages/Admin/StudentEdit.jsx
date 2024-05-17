import MainButton from "../../components/MainButton";
import FormGroup from "../../components/form/FormGroup";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import MainLayout from "../../layout/MainLayout";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import Message from "../../components/Message";
import { fetchClassLevels } from "../../redux/slice/classSlice";
import {
  addAcademicStudent,
  getSingleStudent,
  updateAcademicStudent,
} from "../../redux/slice/adminStudentSlice";
import { useParams } from "react-router-dom";
function StudentEdit() {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClassLevels());
  }, [dispatch]);
  useEffect(() => {
    getStudent();
  }, []);
  const dataClasse = useSelector((state) => state.classLevelReducer.classLevel);
  // const { loading } = useSelector((state) => state.acamicTeacherReducer);
  const { loading } = useSelector((state) => state.academicTeacherReducer);
  const [student, setStudent] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    birthday: "",
    sexe: "Femme",
    adresse: "",
    photo: "",
    phoneNumber: "",
    classLevel: "",
  });
  const getStudent = async () => {
    console.log(id);
    const response = await dispatch(getSingleStudent(id));
    setStudent(response.payload.data);
  };

  const handleChange = (e) => {
    // if (e.target.name === "phoneNumber") {
    //   setTeacher({ ...teacher, phoneNumber: e });
    // } else {
    setStudent({ ...student, [e.target.name]: e.target.value });
    console.log(isButtonDisabled);
  };
  const handlePhone = (value) => {
    setStudent({ ...student, phoneNumber: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStudent({ ...student, id: id });
    console.log(student);
    // console.log(formData.get("photo"));
    // console.log(student);
    dispatch(updateAcademicStudent(student)).then((res) => {
      console.log(res)
      if (res.type === "academicTerms/updateAcademicStudent/fulfilled") {
        toast.success("Enregistrement effectue avec succes");
        window.location.href = "/admin/students";
      }
    });
  };

  const isButtonDisabled =
    !student.name ||
    !student.lastname ||
    !student.email ||
    !student.birthday ||
    !student.sexe ||
    !student.adresse;

  return (
    <MainLayout>
      <form className="form__layout" onSubmit={handleSubmit}>
        <div className="form__layout--wrapper">
          <FormGroup label="Nom">
            <Input
              type="text"
              placeholder="Entrez le nom du professeur"
              name="name"
              
              onChange={handleChange}
              valeur={student?.name}
            />
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Prenom">
            <Input
              type="text"
              placeholder="Entrez le prenom du professeur"
              name="lastname"
              onChange={handleChange}
              valeur={student?.lastname}
            />
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Email">
            <Input
              type="text"
              placeholder="Entrez le mail du professeur"
              name="email"
              onChange={handleChange}
              valeur={student?.email}
            />
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Naissance">
            <Input
              type="date"
              placeholder="Entrez la date de naissance du professeur"
              name="birthday"
              onChange={handleChange}
              valeur={student?.birthday}
            />
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Sexe">
            <Select name="sexe" onChange={handleChange}>
              <option value="Femme">Femme</option>
              <option value="Homme">Homme</option>
            </Select>
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Adresse">
            <Input
              type="text"
              placeholder="Entrez l'adresse du professeur"
              name="adresse"
              onChange={handleChange}
              valeur={student?.adresse}
            />
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Téléphone">
            <PhoneInput
              country={"tn"}
              value={student.phoneNumber}
              onChange={handlePhone}
              inputProps={{
                name: "phoneNumber",
                required: true,
                autoFocus: true,
              }}
            />
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Classe">
            <select name="classLevel" id="" onChange={handleChange}>
              {dataClasse?.map((classe) => (
                <option key={classe._id} value={classe._id}>
                  {classe.name}
                </option>
              ))}
            </select>
          </FormGroup>
        </div>
        <MainButton
          text="Modifier"
          isDisabled={isButtonDisabled}
          type="submit"
          classname="main-button"
          loading={loading}
        />
      </form>
    </MainLayout>
  );
}

export default StudentEdit;
