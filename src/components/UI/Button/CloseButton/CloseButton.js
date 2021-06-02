import { ReactComponent as WhiteCross } from "../../../../assets/svg/whiteOff.svg";
import styles from "./CloseButton.module.css";
import whiteCross from "../../../../assets/icons/whiteOff.ico";

const CloseButton = () => (
  <div className={styles.closeButton}>
    {/* <WhiteCross /> */}
    <img 
      alt="close-application"
      src={whiteCross}
    />
  </div>
)

export default CloseButton;