import React from "react";
import cn from "classnames";
import "./styles.scss";

const View = ({
  children,
  className,
  isRow,
  justify = "flex-start",
  align = "",
  renderIf = true,
  flexGrow = 0,
  style,
  ...props
}) => {
  if (!renderIf) return null;

  return (
    <div
      className={cn(
        "cmp-view",
        {
          [`cmp-view__justify--${justify}`]: justify,
          [`cmp-view__align--${align}`]: align,
          "cmp-view--row": isRow,
        },
        className
      )}
      style={{ ...style, flexGrow }}
      {...props}
    >
      {children}
    </div>
  );
};

export default View;
