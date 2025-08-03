import React from 'react'

function Banner2({ title, model }) {
  return (
    <div className="flex items-center justify-center h-[80vh] px-4 text-center">
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-white">{title}</h2>
        <p className="mt-4 text-md md:text-lg text-gray-300">{model}</p>
      </div>
    </div>
  );
}


export default Banner2