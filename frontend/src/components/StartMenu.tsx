import { Link } from 'react-router-dom';
import "../index.css"

export default function StartMenu() {
    return (
    <>
       <h1 className="text-black">Vulnerabilities & Remedies</h1>
        <div className="menu-container">
            <div className="menu-buttons">

                <Link className="menu-button" to={"/enter-name"}>
                    Start Games
                </Link>

                <Link className="menu-button" to={"/load-game"}>
                    Load Game
                </Link>

                <Link className="menu-button" to={"/how-to-play"}>
                    How to Play
                </Link>

            </div>
        </div>
    </>
)};