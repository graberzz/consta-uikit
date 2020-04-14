import * as React from 'react';

function Xs(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M14 5H2V3h12v2zM14 9H2V7h12v2zM2 13h12v-2H2v2z" />
    </svg>
  );
}

export default Xs;