import Typography from "@mui/material/Typography";
import theme from "../../../styles/theme.json";
import "./textelem.scss";

const TextElipsis = (props: any) => {
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
      default:
        return `text-s2 ${theme.font.classes.fregular}`;
    }
  };

  return (
    <div {...{ style: props.style, className: props.className }}>
      <Typography className={`text-elem ${getStyle()} text-ellipsis`}>
        {props.children}
      </Typography>
    </div>
  );
};

export default TextElipsis;
