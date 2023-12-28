import React, { useState } from "react";
import { GrValidate, GrHistory } from "react-icons/gr";
import { MdOutlineBlock } from "react-icons/md";

type LogoProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  type: "visited" | "revoked" | "allowed";
};
const Logo = (props: LogoProps) => {
  const { src, alt, type, ...rest } = props;
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
    {
      visited: <GrHistory size={20} />,
      revoked: <MdOutlineBlock size={20} />,
      allowed: <GrValidate size={20} />,
    }[type]
  );
};

export default Logo;
