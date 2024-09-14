export default function Title ({dictionary}) {
    
    return(
        <div className="title-content">
            <div className="title-text">
                <span className="title-name">{dictionary.name}</span>
                <span className="title-rol">{dictionary.rol}</span>
            </div>
        </div>
    )
}