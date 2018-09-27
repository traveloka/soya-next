import PropTypes from "prop-types";
import { withLocale } from "soya-next/i18n";
import LocaleLink from "soya-next/link";
import { localeShape } from "soya-next/prop-types";
import LanguagePicker from "./LanguagePicker";
import data from "../data/i18n.json";

const Layout = ({ children, locale, siteLocales }) => (
  <>
    <LanguagePicker />
    <hr />
    <div>
      <LocaleLink href="/">
        <a>{data[locale.language].menuHome}</a>
      </LocaleLink>{" "}
      <LocaleLink href="/about">
        <a>{data[locale.language].menuAboutUs}</a>
      </LocaleLink>
    </div>
    {children}
    <hr />
    <LanguagePicker />
  </>
);

Layout.propTypes = {
  children: PropTypes.node,
  locale: localeShape.isRequired,
  siteLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default withLocale(Layout);
