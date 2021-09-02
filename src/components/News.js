import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import Noimg from './noImage.jpg'
// import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 12,

    }
    // static PropTypes ={
    //     country: Proptypes.string,
    //     category: Proptypes.string,
    //     pageSize: Proptypes.number,

    // }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResult:0        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    fetchMoreData = async ()=> {
        this.setState({page:this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResult: parseData.totalResult

        })
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.setState({ loading: true });
        let data = await fetch(url); 
        this.props.setProgress(40);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({

            loading: false,
            articles: parseData.articles,
            totalResult: parseData.totalResult

        })
        this.props.setProgress(100)
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    render() {
        return (
           
            <>
                <h1 className="text-center" style={{ marginBottom: '20px', marginTop: '20px'}}>NEWs-room Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResult}
                    loader={<Spinner/>}>
                    <div className="container">
                    <div className="row my-4">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                    imgurl={element.urlToImage ? element.urlToImage : Noimg} newsurl={element.url} date={element.publishedAt} author={element.author}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll >

                {/* <div className="container d-flex justify-content-between my-4">

                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResult / 12)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News
