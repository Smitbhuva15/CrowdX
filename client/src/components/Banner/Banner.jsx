import React from 'react'

export const Banner = ({ title }) => {
  return (
    <h2 className="text-xl xs:text-3xl md:text-4xl font-extrabold text-white tracking-wide mb-6">
      {title}
    </h2>
  );
};
