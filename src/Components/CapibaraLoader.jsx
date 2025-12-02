import React from "react";
import capibaraGif from "../assets/capibarita.gif";

const CapibaraLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src={capibaraGif}
        alt="Cargando..."
        className="w-40 h-40 object-contain"
      />
      <p className="mt-4 text-xl font-semibold text-pink-700 dark:text-pink-300">
        Cargando catálogo...
      </p>
    </div>
  );
};

export default CapibaraLoader;
