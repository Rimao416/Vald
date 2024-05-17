import { useState, useEffect } from "react";
import ModalLayout from "../../layout/ModalLayout";
ModalLayout;
import MainButton from "../MainButton.jsx"

import "flatpickr/dist/themes/light.css";
import moment from "moment";

import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";

import { addAcademicYear } from "../../redux/slice/academicYearSlice";
function ModalHandleAcademicYear({ onClose, modal }) {
  const { status,loading } = useSelector((state) => state.academicYearReducer);
  console.log(status);
  useEffect(() => {
    status === "fulfilled" && onClose();
  }, [status, onClose]);

  const dispatch = useDispatch();
  const [date, setDate] = useState({
    fromYear: "",
    toYear: "",
  });
  const handleChange = (selectedDates, name) => {
    const selectedDate = moment(selectedDates[0]).format("YYYY-MM-DD");

    setDate({
      ...date,
      [name]: selectedDate,
    });
    setDate((prevDate) => ({
      ...prevDate,
      [name]: selectedDate,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(date);
    dispatch(addAcademicYear(date));
  };

  return (
    <ModalLayout
      title="Nouvelle année académique"
      onClose={onClose}
      modal={modal}
    >
      <form onSubmit={handleSubmit}>
        <div className="form__wrapper">
          <label htmlFor="" className="auth__form--label label">
            Premier jour de l&apos;année
          </label>
          <Flatpickr
            data-enable-time
            name="fromYear"
            value={date.fromYear}
            onChange={(selectedDates) =>
              handleChange(selectedDates, "fromYear")
            }
            options={{
              enableTime: false,
            }}
          />
        </div>
        <div className="form__wrapper u-block u-margin-top-medium">
          <label htmlFor="" className="auth__form--label label">
            Dernier jour de l&apos;année
          </label>
          <Flatpickr
            data-enable-time
            name="toYear"
            value={date.toYear}
            onChange={(selectedDates) => handleChange(selectedDates, "toYear")}
            options={{
              enableTime: false,
            }}
          />
        </div>
        <MainButton text="Enregistrer" loading={loading} type="submit" classname="main-button"/>

      </form>
    </ModalLayout>
  );
}

export default ModalHandleAcademicYear;
