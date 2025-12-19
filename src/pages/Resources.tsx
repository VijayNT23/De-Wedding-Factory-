import React from "react";
import DigitalBrochures from "../components/DigitalBrochures";
import SEO from "../components/SEO";

const Resources: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Wedding Planning Resources | Digital Brochures & Downloads | De Wedding Factory"
        description="Download comprehensive wedding planning resources, venue guides, and inspiration materials. Free digital brochures for your perfect Indian wedding planning."
        keywords="wedding planning resources, digital brochures, wedding guides, venue directories, planning checklists, wedding inspiration, free downloads"
        canonical="https://deweddingfactory.com/resources"
      />
      
      <DigitalBrochures />
    </div>
  );
};

export default Resources;
