import { useEffect } from "react";

const Modal = (props) => {
  const show = props.show;
  const handleScroll = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  // ## When Modal Loads, adds event listeners to listen for clicks outside modal and esc key.
  useEffect(() => {
    const handleEsc = (event) => {
      let modal = document.getElementById("modal");
      if (event.key === "Escape" || event.target === modal) show(false);
    };
    window.addEventListener("mousedown", handleEsc);
    window.addEventListener("keydown", handleEsc);
    document.getElementById("root").addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("mousedown", handleEsc);
      document
        .getElementById("root")
        .removeEventListener("wheel", handleScroll);
    };
  }, [show]);
  return (
    <>
      {show && (
        <dialog id="modal" className="modalContainer">
          {props.children}
        </dialog>
      )}
    </>
  );
};
export default Modal;
