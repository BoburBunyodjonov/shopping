import React from "react";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t("about.title")}</h1>
      <p className="mt-4">{t("about.text")}</p>
    </div>
  );
};

export default About;
