import React, { useState } from "react";
import { MdOutlineBlock } from "react-icons/md";

const Logo = (
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
      className="w-8 h-8 object-cover object-center"
    />
  ) : (
    <MdOutlineBlock size={20} />
  );
};

export default Logo;
