import React from "react";
import PackageGrid from "../PackageGrid/PackageGrid";
import PackageGrid1 from "../PackageGrid1/PackageGrid1";
import PackageGrid2 from "../PackageGrid2/PackageGrid2";

const GridManager = () => {
  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PackageGrid />
        <PackageGrid1 />
        <PackageGrid2 />
      </div>
    </div>
  );
};

export default GridManager;
