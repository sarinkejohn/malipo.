import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

function Header({ category, title }) {
  const { currentColor } = useStateContext();
  return (
    <div className=" mb-4">
      <p className="text-lg text grey-400" style={{ color: currentColor }}>
        {category}
      </p>
      <p
        className="text-2xl  font-extrabold tracking-tight text-slate-900"
        style={{ color: currentColor }}
      >
        {title}
      </p>
    </div>
  );
}
export default Header;
