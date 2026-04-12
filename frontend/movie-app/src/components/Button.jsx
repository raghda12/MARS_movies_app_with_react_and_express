const Button = ({ label, onClick, variant = "primary", type = "button" }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
