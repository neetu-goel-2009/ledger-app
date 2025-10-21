import theme from "../../../styles/theme.json";
import "./textelem.scss";

const TextElem = (props: any) => {
  const type = props.type;

  const getStyle = () => {
    switch (type) {
      case "s1":
        return `text-s1 ${theme.font.classes.fthin}`;
      case "s2":
        return `text-s2 ${theme.font.classes.fregular}`;
      case "s3":
        return `text-s3 ${theme.font.classes.fbold}`;
      case "hr":
        return `text-hr ${theme.font.classes.fregular}`;
      case "c1":
        return `text-c1 ${theme.font.classes.fbold}`;
      case "c2":
        return `text-c2 ${theme.font.classes.fthin}`;
      case "c3":
        return `text-c3 ${theme.font.classes.fregular}`;
      default:
        return `text-s2 ${theme.font.classes.fregular}`;
    }
  };

  return (
    <div
      {...{ style: props.style }}
      className={`${props.className || ""} text-elem ${getStyle()}`}
    >
      {props.children}
    </div>
  );
};

export default TextElem;
