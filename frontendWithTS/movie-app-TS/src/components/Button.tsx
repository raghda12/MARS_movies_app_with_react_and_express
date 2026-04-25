
interface ButtonProps{
  label: string;
  onclick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | string;
  type?: "button" | "submit" | "reset";
  
}
const Button: React.FC<ButtonProps> = ({ label, onclick, variant = "primary", type = "button" }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onclick} type={type}>
      {label}
    </button>
  );
};

export default Button;
