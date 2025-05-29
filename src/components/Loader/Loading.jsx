import React from 'react';

const Loader = () => {
  const text = "PACKAGE";
  const colors = ["#2e7d32", "#4caf50", "#81c784", "#a5d6a7", "#66bb6a", "#388e3c", "#1b5e20"];

  return (
    <div className='flex justify-center items-center h-screen bg-white bg-opacity-30 backdrop-blur-3xl'>
      <h1 className='font-bold text-4xl tracking-widest flex space-x-2'>
        {text.split("").map((char, idx) => (
          <span key={idx} style={{ color: colors[idx % colors.length] }}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Loader;
