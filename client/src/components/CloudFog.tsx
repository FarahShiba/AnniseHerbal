import React from "react";

const CloudFog: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-stone-100/30 rounded-full blur-3xl top-40 right-0 animate-pulse delay-1000"></div>
      <div className="absolute w-96 h-96 bg-emerald-50/20 rounded-full blur-3xl bottom-0 left-1/3 animate-pulse delay-2000"></div>
    </div>
  );
};

export default CloudFog;
