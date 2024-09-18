import { IoMdMoon } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { useTheme } from '../../../ThemeContext';
import "../../../styles/menu.scss"

export default function DarkModeBttn() {
    const { theme } = useTheme();
    const { toggleTheme } = useTheme();

    return (
        <div className="dark-mode" onClick={toggleTheme} >
            {theme === "dark" ? <IoMdSunny size={30}/> : <IoMdMoon size={30}/>}
        </div>
    );
}