export const getRatingColor = (val: number) => {
  const value = Math.ceil(val);
  switch (value) {
    case 1:
      return "red";
    case 2:
      return "coral";
    case 3:
      return "orange";
    case 4:
      return "#357BDF";
    case 5:
      return "green";
    default:
      return "green";
  }
};
