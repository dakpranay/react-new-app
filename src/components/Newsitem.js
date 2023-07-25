import React, { Component } from 'react'

export class Newsitem extends Component {


    render() {
        let {title,description,imageurl,newsurl}=this.props
        return (
            <div className='my-3'>
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={!imageurl?"https://imgeng.jagran.com/images/2023/jul/sony-project-q-gaming-console-headset1690113284007.jpg":imageurl} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a rel='noreferrer' href={newsurl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
