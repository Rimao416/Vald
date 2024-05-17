import React from "react";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { Audio } from "react-loader-spinner";
function MainButton({ text, isDisabled,type="button",classname, loading,onClick }) {
  
  // const loading = false;
  return (
    <button
      className={`${classname}  u-block ${
        isDisabled ? `${classname}--disabled` : ""
      } u-margin-top-big`}
      type={type}
      // onClick={() => setScreen(screen)}
      disabled={isDisabled}
      onClick={onClick}
    >
      {loading ? (
        <Oval
          height={50}
          width={50}
          color="#ffffff"
          wrapperStyle={{}}
          wrapperClass="loader"
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        text
      )}
    </button>
  );
}

export default MainButton;
