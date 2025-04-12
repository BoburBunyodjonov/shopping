import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.aboutTitle")}</h3>
            <p className="text-sm text-gray-400">{t("footer.aboutText")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  {t("footer.aboutUs")}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  {t("footer.contactUs")}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white">
                  {t("footer.privacyPolicy")}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white">
                  {t("footer.termsConditions")}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.customerSupport")}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white">
                  {t("footer.faqs")}
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-white">
                  {t("footer.returnsRefunds")}
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-white">
                  {t("footer.shippingInfo")}
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-white">
                  {t("footer.supportCenter")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("footer.followUs")}</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {t("footer.facebook")}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {t("footer.twitter")}
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {t("footer.instagram")}
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                {t("footer.linkedin")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
