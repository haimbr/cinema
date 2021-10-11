import { logOut } from "../../utils/loginUtils";

const Header = ({ setUser }) => {

    const onClickLogOut = () => {
        logOut()
    }

  
    return (
        <div className="header__container">
            <div className="logUot" onClick={onClickLogOut}>יציאה</div>
        </div>
    )
}

export default Header;
