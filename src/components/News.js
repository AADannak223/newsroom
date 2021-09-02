import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import Noimg from './noImage.jpg'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const fetchMoreData = async ()=> {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResult(parseData.totalResults);
        console.log(totalResult)
        console.log(articles.length)
    }

    const updateNews = async ()=> {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
        setLoading(true);
        let data = await fetch(url); 
        props.setProgress(40);
        let parseData = await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setLoading(false);
        setTotalResult(parseData.totalResults);
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - news-room`;
        updateNews();  
        // eslint-disable-next-line 
    }, []);

        return (
            <>
                <h1 className="text-center" style={{ marginBottom: '10px', marginTop: '80px'}}>NEWs-room Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResult}
                    loader={<Spinner/>}>
                    <div className="container">
                    <div className="row my-4">
                        {articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                    imgurl={element.urlToImage ? element.urlToImage : Noimg} newsurl={element.url} date={element.publishedAt} author={element.author}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll >
            </>
        )
    }

export default News

News.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 12,
}
