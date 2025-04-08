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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.9630579153169!3d-37.81410797975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d9f0b7b1a1e!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611812345678!5m2!1sen!2sau"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;
