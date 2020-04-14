import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" {...props}>
      <path d="M11 3v1H1V3h10zM8 6v1H1V6h7zM5 10V9H1v1h4z" />
    </svg>
  );
}

export default Xs;