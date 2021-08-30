import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import Noimg from './noImage.jpg'
// import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps ={
        country: "in",
        category: "general",
        pageSize: 8,

    }
    // static PropTypes ={
    //     country: Proptypes.string,
    //     category: Proptypes.string,
    //     pageSize: Proptypes.number,

    // }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }

    async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fcf11b3fd0d42c8842e0e4dd96461c9&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            loading: false,
            totalResult: parseData.totalResults,
            
            })
    }

    handlePreviousClick = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fcf11b3fd0d42c8842e0e4dd96461c9&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                page: this.state.page - 1,
                loading: false,
                articles: parseData.articles
                
            })
    }

    handleNextClick = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6fcf11b3fd0d42c8842e0e4dd96461c9&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NEWs-room Top Headlines</h1>
                {this.state.loading&&<Spinner/>}
                <div className="row my-4">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-3" key={element.url}>
                            <Newsitem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgurl={element.urlToImage?element.urlToImage:Noimg} newsurl={element.url} />
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between my-4">

                    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page>=Math.ceil(this.state.totalResult/12)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
