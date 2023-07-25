import React, { Component } from 'react'
import Newsitem from './Newsitem'
import '../css/news.css'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps ={
        country:'in',
        pageSize:10,
        category:'general'
    }

    static propType ={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string

    }

    constructor() {
        super()
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=981bd5ef61c045558443f7aa9574140f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedata = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedata.articles,
            loading:false
        })
    }

    handleNextClick = async () => {
        if(!(this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=981bd5ef61c045558443f7aa9574140f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url)
            let parsedata = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedata.articles,
                loading:false
            })
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=981bd5ef61c045558443f7aa9574140f&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedata = await data.json()
        console.log(parsedata)
        this.setState({ articles: parsedata.articles,
            totalResults:parsedata.totalResults,
            loading:false
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h2  className='text-center'>News</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    { !this.state.loading && this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-3">
                            <Newsitem title={element.title ? element.title.slice(0, 15) : ""} description={element.description ? element.description.slice(0, 85) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 >Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
