import { PiStudent } from "react-icons/pi";
import {Link} from "react-router-dom"
function Card(props) {
  return (
    <div className="card">
      <div className="card__text">
        <h4 className="card__title">{props.title}</h4>
        <p className="card__subtitle">150</p>
      </div>
      <div className="card__footer">
      <span className="card__link">
        <Link to="#">Voir plus</Link>
      </span>
      <span className={`card__logo  ${props.color}`}>
        <PiStudent />
      </span>
      </div>
    </div>
  );
}

export default Card;
