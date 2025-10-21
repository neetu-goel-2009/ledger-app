import Avatar from "react-avatar";

import theme from "../../../styles/theme.json";

const TextAvatar = (props: any) => {
  const name = props.name;

  return (
    <Avatar
      name={name}
      size="40"
      round="20px"
      color={theme.colors.blueBG}
      fgColor={theme.colors.blueText}
      maxInitials={2}
      alt={name}
      title={name}
      className=""
    />
  );
};

export default TextAvatar;
