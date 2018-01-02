import StyledModules from "styled-modules/style";
import tachyons from "tachyons/css/tachyons.css";
import index from "./index.css";

export default ({ children }) => (
  <StyledModules styles={[tachyons, index]}>{children}</StyledModules>
);
