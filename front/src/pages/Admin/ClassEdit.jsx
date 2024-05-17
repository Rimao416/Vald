import { useEffect, useState } from "react";
import FormGroup from "../../components/form/FormGroup";
import Input from "../../components/form/Input";
import MainLayout from "../../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";

import {
  addClassLevel,
  getSingleClassLevel,
  updateClassLevel,
} from "../../redux/slice/classSlice";
import MainButton from "../../components/MainButton";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
function ClassEdit() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, status, academicSubject } = useSelector(
    (state) => state.academicSubjectReducer
  );

  useEffect(() => {
    if (status === "success") {
      navigate("/admin/subjects");
    }
  }, [status, navigate]);

  const getClasse = async () => {
    const response = await dispatch(getSingleClassLevel(_id));
    // setStudent(response.payload.data);
    setData(response.payload.data);
  };

  useEffect(() => {
    if (_id) {
      getClasse();
    } else {
      console.lg;
    }
  }, [_id]);

  //   const { classLevel } = useSelector((state) => state.classLevelReducer);

  const [data, setData] = useState({
    name: "",
    frais: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    dispatch(
      updateClassLevel({ name: data.name, frais: data.frais, _id: _id })
    ).then((res) => {
      // dispatch(addClassLevel(data));
      if (res.type === "classLevels/updateClassLevel/fulfilled") {
        window.location.href = "/admin/class/";
      }
    });

    // navigate("/admin/subjects");
    // console.log(data);
  };
  return (
    <MainLayout>
      <form className="form__layout" onSubmit={handleSubmit}>
        <div className="form__layout--wrapper">
          <FormGroup label="Nom">
            <Input
              type="text"
              placeholder="Entrez le nom de la classe"
              name="name"
              onChange={handleChange}
              valeur={data?.name}
            />
          </FormGroup>
          <p>{data.name}</p>
        </div>
        <div className="form__layout--wrapper">
          <FormGroup label="Frais">
            <Input
              type="number"
              placeholder="Entrez le frais"
              name="frais"
              onChange={handleChange}
              valeur={data?.frais}
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

        <MainButton
          text={_id ? "Modifier" : "Enregistrer"}
          isDisabled={false}
          type="submit"
          classname="main-button"
          loading={loading}
        />
      </form>
    </MainLayout>
  );
}

export default ClassEdit;
