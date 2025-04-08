import React from "react";

const Map: React.FC = () => {
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "450px",
        marginTop: "20px",
        border: "1px solid #ccc",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11997.34700025259!2d69.138827!3d41.2586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b3df67c9e63%3A0xf302574527f3ad8b!2zNDHCsDE1JzMxLjAiTiA2OcKwMDgnNDIuNCJF!5e0!3m2!1suz!2s!4v1712497575333!5m2!1suz!2s"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>

    </div>
  );
};

export default Map;
