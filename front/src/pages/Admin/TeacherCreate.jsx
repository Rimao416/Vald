import Image from "../../components/Image";
import MainButton from "../../components/MainButton";
import FormGroup from "../../components/form/FormGroup";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import MainLayout from "../../layout/MainLayout";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAcademicTeacher } from "../../redux/slice/adminTeacherSlice";
import Message from "../../components/Message";
function StudentCreate() {
  const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state.acamicTeacherReducer);
  const {loading} = useSelector((state) => state.academicTeacherReducer);
  const [teacher, setTeacher] = useState({
    name: "",
    lastname: "",
    email: "",
    birthday: "",
    sexe: "Femme",
    adresse: "",
    photo: "",
    phoneNumber: "",
  });
  const handleChange = (e) => {
    // if (e.target.name === "phoneNumber") {
    //   setTeacher({ ...teacher, phoneNumber: e });
    // } else {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
    console.log(isButtonDisabled);
  };
  const handlePhone = (value) => {
    setTeacher({ ...teacher, phoneNumber: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teacher);
    const formData = new FormData();
    formData.append("name", teacher.name);
    formData.append("lastname", teacher.lastname);
    formData.append("email", teacher.email);
    formData.append("birthday", teacher.birthday);
    formData.append("sexe", teacher.sexe);
    formData.append("adresse", teacher.adresse);
    formData.append("phoneNumber", teacher.phoneNumber);
    formData.append("photo", teacher.photo);
    // console.log(formData.get("photo"));
    // console.log(teacher);
    dispatch(addAcademicTeacher(formData));
  };

  const isButtonDisabled =
    !teacher.name ||
    !teacher.lastname ||
    !teacher.email ||
    !teacher.birthday ||
    !teacher.sexe ||
    !teacher.adresse;
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
            />
          </FormGroup>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Téléphone">
            <PhoneInput
              country={"tn"}
              value={teacher.phoneNumber}
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
          <FormGroup label={"Photo de l'enseignant"}>
            <Image name="photo" user={teacher} setUser={setTeacher} />
            <input
              type="file"
              name="photo"
              onChange={(e) =>
                setTeacher({ ...teacher, photo: e.target.files[0] })
              }
              id=""
            />
          </FormGroup>
        </div>
        <MainButton
          text="Enregistrer"
          isDisabled={isButtonDisabled}
          type="submit"
          classname="main-button"
          loading={loading}
        />
      </form>
    </MainLayout>
  );
}

export default StudentCreate;
