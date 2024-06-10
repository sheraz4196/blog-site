const getHeadingString = (children) => {
  if (typeof children === "string") {
    return children?.trim().replace(/ /g, "-");
  } else if (Array.isArray(children)) {
    return children.find(
      (data) => typeof data === "string" && data?.trim().replace(/ /g, "-")
    );
  } else {
    return "";
  }
};
export default getHeadingString;
