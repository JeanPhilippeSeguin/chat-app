import { useState, type HTMLProps } from "react";

import "./AppImage.scss";
import AppSkeleton from "./AppSkeleton";

type Props = HTMLProps<HTMLImageElement>;

const AppImage = ({ className, ...props }: Props) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(props?.src);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let classNames = "AppImage";

  if (className) {
    classNames = `${classNames} ${className}`;
  }

  if (isLoading) {
    classNames = `${classNames} AppImage--isLoading`;
  }

  return (
    <div className={classNames}>
      {(isLoading || !imgSrc) && <AppSkeleton className="AppImage__skeleton" />}

      {imgSrc && (
        <img
          className="AppImage__image"
          {...props}
          onLoad={() => {
            setIsLoading(false);
          }}
          onError={() => {
            setImgSrc(undefined);
          }}
        />
      )}
    </div>
  );
};

export default AppImage;
