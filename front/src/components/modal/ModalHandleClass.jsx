import React, { useState,useEffect } from "react";
import ModalLayout from "../../layout/ModalLayout";
import FormGroup from "../form/FormGroup";
import Select from "../form/Select";
import { useDispatch, useSelector } from "react-redux";
import { addClassLevel } from "../../redux/slice/classSlice";
import MainButton from "../MainButton";

function ModalHandleClass({ onClose, modal }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("Licence");
  const { status,loading } = useSelector((state) => state.classLevelReducer);
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addClassLevel(name)).then((res) => {
      console.log(res)
      if(res.type==="classLevel/addClassLevel/fulfilled"){
        // toast.success("Enregistrement effectue avec succes");
        window.location.href = "/admin/classes";
      }
    });
    // disp
  };
  useEffect(() => {
    status === "fulfilled" && onClose();
  }, [status, onClose]);
  return (
    <ModalLayout title="Nouveau Niveau" onClose={onClose} modal={modal}>
      <form onSubmit={handleSubmit}>
        <div className="form__wrapper w-600">
          <FormGroup label="Veuillez choisir le niveau">
            <Select name="name" handleChange={handleChange}>
              <option value="Licence">Licence</option>
              <option value="Master">Master</option>
              <option value="Doctorat">Doctorat</option>
            </Select>
          </FormGroup>
        </div>
        <MainButton type="submit" classname="main-button" text="Enregistrer" loading={loading}/>
      
      </form>
    </ModalLayout>
  );
}

export default ModalHandleClass;
