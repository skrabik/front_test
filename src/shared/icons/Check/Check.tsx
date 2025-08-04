import { FC } from 'react';

import { IconProps } from '../Icon.props';

export const Check: FC<IconProps> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1981 5.27096C21.5557 5.61613 21.5659 6.18589 21.2207 6.54355L9.79149 18.3862C9.62188 18.5619 9.38813 18.6612 9.14389 18.6612C8.89965 18.6612 8.6659 18.5619 8.49629 18.3862L2.7817 12.4649C2.43652 12.1072 2.44665 11.5374 2.80431 11.1923C3.16197 10.8471 3.73172 10.8572 4.0769 11.2149L9.14389 16.4652L19.9255 5.29356C20.2707 4.9359 20.8404 4.92578 21.1981 5.27096Z"
        fill="#10135A"
      />
    </svg>
  );
};
