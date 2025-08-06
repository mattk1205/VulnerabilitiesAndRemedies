import {Link} from "react-router-dom";

export default function HowToPlay() {
    return (
        <div className="grid grid-cols-1 gap-20 text-black text-4xl">
            <h1>How to Play</h1>
            <div>
                This is a high level overview othe hoe to play the game I do not want to retype the instrfutions
                so eventually I will be importeding the t=fromm the docuemntation that I made but I hope rith now
                I can fill some space to make sure it looks right thank you
            </div>
            <Link to="/">Home</Link>
        </div>
    )
}