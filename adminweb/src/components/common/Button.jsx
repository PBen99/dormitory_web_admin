import className from "classnames";

const Button = (props) => {
  const { type, content, onClick, isDisable, size } = props;
  const btnStyle = className(
    "btn-custom",
    `${size ? "style-small" : " "}`,
    `${type === "normal-blue" ? "btn-bg-blue" : ""}`,
    `${type === "normal-yellow" ? "btn-bg-yellow" : ""}`,
    `${type === "normal-red" ? "btn-bg-red" : ""}`,
    `${type === "normal-ubg" ? "btn-ubg" : ""}`,
    `${type === "normal-green" ? "btn-bg-green" : ""}`,
    `${isDisable ? "disable_button" : " "}`
  );
  return (
    <button className={btnStyle} onClick={onClick} disabled={isDisable}>
      {content}
    </button>
  );
};
export default Button;
