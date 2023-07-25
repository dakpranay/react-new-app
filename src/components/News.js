import React, { Component } from 'react'
import Newsitem from './Newsitem'
import '../css/news.css'

export class News extends Component {

    constructor() {
        super()
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=981bd5ef61c045558443f7aa9574140f&page=${this.state.page-1}&pageSize=20`
        let data = await fetch(url)
        let parsedata = await data.json()
        console.log(parsedata)
        this.setState = {
            page: this.state.page - 1,
            articles: parsedata.articles,
        }

    }

    handleNextClick = async () => {
        if(this.state.page + 1 >Math.ceil(this.state.totalResults/20)){

        }else{
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=981bd5ef61c045558443f7aa9574140f&page=${this.state.page+1}&pageSize=20`
            let data = await fetch(url)
            let parsedata = await data.json()
            console.log(parsedata)
            this.setState = {
                page: this.state.page + 1,
                articles: parsedata.articles,
            }
        }

    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=981bd5ef61c045558443f7aa9574140f&page=1&pageSize=20"
        let data = await fetch(url)
        let parsedata = await data.json()
        console.log(parsedata)
        this.setState({ articles: parsedata.articles,
            totalResults:parsedata.totalResults
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>News</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-3">
                            <Newsitem title={element.title ? element.title.slice(0, 15) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageurl={element.urlToImage} newsurl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News