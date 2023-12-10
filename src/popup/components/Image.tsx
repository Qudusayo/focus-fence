import React, { useState } from "react";
import { MdOutlineBlock } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import "../../assets/tailwind.css";

const Image = (
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  const { src, alt, ...rest } = props;
  const [SRC, setSrc] = useState<string>(src);
  const handleError = () => {
    setSrc("");
  };
  return SRC ? (
    <img
      src={SRC}
      alt={alt}
      onError={handleError}
      {...rest}
      className="w-6 h-6 object-cover object-center"
    />
  ) : props["aria-label"] === "whitelist" ? (
    <FaCircleCheck />
  ) : (
    <MdOutlineBlock size={20} />
  );
};

export default Image;
