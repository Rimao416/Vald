function View(props) {
  return (
    <div className="view__container" key={props._id}>
      <div className="view__wrapper">
        {props.type === "avatar" ? (
          props.image
        ) : (
          <img
            src={props.image}
            className="view__container--img"
            alt={props.image}
          />
        )}
        <div className="view__container--content">{props.children}</div>
      </div>
    </div>
  );
}

export default View;
