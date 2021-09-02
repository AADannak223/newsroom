import React, { Component } from 'react'
// import {Link} from "react-router-dom"

export class Newsitem extends Component {

    render() {
        let { title, description, imgurl, newsurl, date, author, source} = this.props;
        return (
            <div>
                <div className="card" style={{ width: "18rem", marginTop: ""}}>
                <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }><span className="badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
                    </div>

                    <img src={imgurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toUTCString()}</small></p>
                        <a href={newsurl} className="btn btn-dark btn-sm">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
