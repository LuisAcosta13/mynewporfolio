import LittleRobotCanvas from "./3d_model/LittleRobotCanvas"

export default function Title ({dictionary}) {
    
    return(
        <div className="title-content">
            <LittleRobotCanvas/>
            <div className="title-text">
                <span className="title-name">{dictionary.name}</span>
                <span className="title-rol">{dictionary.rol}</span>
            </div>
        </div>
    )
}