import React, { Component } from 'react'

export class Newsitem extends Component {


    render() {
        let {title,description,imageurl,newsurl,author,date}=this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <img className="card-img-top" src={!imageurl?"https://imgeng.jagran.com/images/2023/jul/sony-project-q-gaming-console-headset1690113284007.jpg":imageurl} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className='card-text'><small className='text-muted'>By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                            <a rel='noreferrer' href={newsurl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
