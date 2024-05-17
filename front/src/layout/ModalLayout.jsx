import React from "react";

import { RxCross2 } from "react-icons/rx";
function ModalLayout({ children,title, onClose, modal }) {
    // console.log(modal)
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <div className="modal">
      <div className="modal__overlay">
        <span className="modal__close" onClick={onClose}>
          <RxCross2 />
        </span>
        <h2 className="modal__title u-block u-margin-top-extra .u-center-text">
          {title}
        </h2>
        <div className="modal__wrapper u-block u-margin-top-big">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalLayout;
