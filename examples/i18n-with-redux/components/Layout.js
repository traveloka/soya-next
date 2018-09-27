import PropTypes from "prop-types";
import LocaleLink from "soya-next/link";
import Dictionary from "../components/Dictionary";
import LanguagePicker from "./LanguagePicker";

const Layout = ({ children }) => (
  <>
    <LanguagePicker />
    <hr />
    <div>
      <LocaleLink href="/">
        <a>
          <Dictionary entryKey="menuHome" />
        </a>
      </LocaleLink>{" "}
      <LocaleLink href="/about">
        <a>
          <Dictionary entryKey="menuAboutUs" />
        </a>
      </LocaleLink>
    </div>
    {children}
    <hr />
    <LanguagePicker />
  </>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
