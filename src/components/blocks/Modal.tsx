type Props = {
  open: boolean;
  transparent: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = (props: Props) => {
  return (
    <div
      onClick={props.onClose}
      className={`fiexd absolute h-screen w-screen z-50 inset-0 flex justify-center items-center transition-colors ${props.open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${props.transparent ? "" : "bg-base-200"} rounded-box shadow p-6 transition-all ${props.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
