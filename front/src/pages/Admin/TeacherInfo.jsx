import { useParams } from "react-router-dom";
import Background from "../../assets/img/TEXTURE_ECOLE.png";
import MainLayout from "../../layout/MainLayout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function TeacherInfo() {
  const { id } = useParams();
  const { academicTeacher } = useSelector(
    (state) => state.academicTeacherReducer
  );
  const [teacher, setTeacher] = useState(undefined);

  useEffect(() => {
    const actualTeacher = academicTeacher.find((teacher) => teacher.id === id);
    setTeacher(actualTeacher);
  }, [academicTeacher, id]);

  return (
    <MainLayout>
      <div className="teacher__header">
        <div className="teacher__header--background">
          <img src={Background} alt="" />
        </div>
        <div className="teacher__header--top">
          <div className="teacher__header--top__wrapper">
            <img
              src="https://images.pexels.com/photos/6002003/pexels-photo-6002003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <div className="teacher__header--top__info">
              <h4>John Doe</h4>
              <p>Teacher</p>
              <p>ID De L'Employé : 154032</p>
              <p>Date de venue : 1st </p>
            </div>
          </div>
        </div>
        <div className="teacher__header--bottom"></div>
      </div>
      <div className="teacher__body">
      <h1>Bonjour</h1>
      </div>
    </MainLayout>
  );
}

export default TeacherInfo;
