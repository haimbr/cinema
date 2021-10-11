import { useState } from "react";
import { login } from "../../utils/loginUtils";




const LoginPage = ({ setUser }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onClickLogin = async (event) => {
        event.preventDefault();
        const userData = await login({ email, password });
        setUser(userData);
    }

    return (
        <div className="login-page__container">
            <form>
                <input type="email" placeholder="כתובת מייל" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit" onClick={onClickLogin}>login</button>
            </form>
        </div>
    )
}

export default LoginPage;
