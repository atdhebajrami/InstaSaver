import React from "react";
import './App.css';

const Post = (props) => {
    return(
        <div>
            <video className="InstaPostImage" src={props.item} onError={i => i.target.style.display='none'} />
            <img className="InstaPostImage" src={props.item} alt="Foto" onError={i => i.target.style.display='none'} />
            <a href={props.item} target="__blank" download>
                <button className="InstaPostButton">Download</button>
            </a>
        </div>
    );
}

export default Post;