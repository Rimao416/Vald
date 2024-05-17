import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalLayout from "../../layout/ModalLayout";
import FormGroup from "../form/FormGroup";
import Input from "../form/Input";
import { addAcademicPrograms } from "../../redux/slice/academicProgram";
import MainButton from "../MainButton";

function ModalHandleProgram({ onClose, modal }) {
    const dispatch = useDispatch();
  const [program, setProgram] = useState({
    name: "",
    duration: "",
  });
  const { status,loading } = useSelector((state) => state.academicProgramReducer);
  
  console.log(status);
  useEffect(() => {
    status === "fulfilled" && onClose();
  }, [status, onClose]);
 
  const handleChange = (event) => {
    setProgram({ ...program, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(program)

    dispatch(addAcademicPrograms(program));
    // disp
  };

  // academicProgramReducer
  return (
    <ModalLayout
      title="Nouveau Programme académique"
      onClose={onClose}
      modal={modal}
    >
      <form onSubmit={handleSubmit}>
        <div className="form__wrapper">
          <FormGroup label="Programme académique">
            <Input
              type="text"
              placeholder={"ex. Science Informatique"}
              name="name"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Durée du programme (en année)">
            <Input
              type="number"
              placeholder={"ex. 4"}
              name="duration"
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <MainButton type="submit" classname="main-button" text="Enregistrer" loading={loading}/>
    
      </form>
    </ModalLayout>
  );
}

export default ModalHandleProgram;
