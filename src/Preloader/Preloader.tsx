import React from "react";
import preloader from '../assets/images/preloader.svg'

let Preloader: React.FC = (props) => {
    console.log("Preloader")
    return <div>
        <img src={preloader}/>
    </div>
}

export default Preloader;