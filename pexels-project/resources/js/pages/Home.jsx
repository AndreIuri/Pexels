import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import helpers from '../utils/helpers';

function Home() {

    const { 
        videos, 
        requestInfos, 
        selectedLocale, setSelectedLocale, 
        selectedResolution, setSelectedResolution,
        getVideos
    } = helpers();

    const setResolution4c = async () => {
        document.querySelectorAll('.grid-1c').forEach(el => {
            el.classList.toggle("grid-1c");
            el.classList.toggle("grid-4c");
        });
        document.querySelectorAll('.fa-list-ul.active').forEach(el => {
            if (el.classList.contains("active")) {
                el.classList.remove("active");
            }
        });
        document.querySelectorAll('.fa-th').forEach(el => {
            if (!el.classList.contains("active")) {
                el.classList.add("active");
            }
        });
        document.body.style.height = "auto";
        getVideos()
    }

    const setResolution1c = async () => {
        document.querySelectorAll('.grid-4c').forEach(el => {
            el.classList.toggle("grid-4c");
            el.classList.toggle("grid-1c");
        });
        document.querySelectorAll('.fa-th.active').forEach(el => {
            if (el.classList.contains("active")) {
                el.classList.remove("active");
            }
        });
        document.querySelectorAll('.fa-list-ul').forEach(el => {
            if (!el.classList.contains("active")) {
                el.classList.add("active");
            }
        });
        getVideos()
    }

    const playVideo = (video) => {
        sessionStorage.setItem("video_files", JSON.stringify(video.video_files));
        window.location.href = "/fullVideo?url="+video.url+"&author_name="+video.user.name+"&id="+video.id+"&duration="+video.duration;
    };

    return (
        <div className="container">
            <Header selectedLocale ={selectedLocale} setSelectedLocale={setSelectedLocale} 
                selectedResolution={selectedResolution} setSelectedResolution={setSelectedResolution}
                getVideos={getVideos} />
            <div className="body">
                <div className="row justify-content-end">
                    <div className='col-2 mt-30 mr-20'>
                        <button title="Grid 4 columns" className="pd-12" type="submit" onClick={() => setResolution4c()}><i className='icon-body pd-12 fa fa-th active'></i></button>
                        <button title="Grid 1 columns" className="pd-12" type="submit" onClick={() => setResolution1c()}><i className='icon-body pd-12 fa fa-list-ul'></i></button>
                    </div>
                </div>
                <div className='grid-cards grid-4c'>
                    {videos.map((video) => {
                        return (
                            <div className="row justify-content-start" key={video.id}>
                                <div className='card' style={{backgroundImage: 'url('+video.image+')' }}>
                                    <button type="submit" title="Play" onClick={() => playVideo(video)}><i className="fa fa-play-circle" style={{fontSize: '48px' }}></i></button>
                                </div>
                                <div className={`card infos-video ${requestInfos[0].per_page === 10 ? 'd-block' : 'd-none'}`}>
                                    <p className='author-name'>{video.user.name}</p>
                                    <p>ID: {video.id}</p>
                                    <p>Duração: {video.duration} segundos</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="row col-11 mb-3 mr-35 text-end justify-content-end">
                    {requestInfos.map((requestInfo, index) => {
                        var classes = 'slide-page pd-10';
                        var active = ' active';
                        const nextPage = requestInfo.total_results - (requestInfo.page * requestInfo.per_page);
                        const next2Page = requestInfo.total_results - ((requestInfo.page+1) * requestInfo.per_page);
                        const previousPage = (requestInfo.page * requestInfo.per_page) - requestInfo.per_page;
                        requestInfo.total_pages = Math.ceil(requestInfo.total_results / requestInfo.per_page);
                        var previousPageLink = '';

                        if(previousPage > 0){
                            previousPageLink = requestInfo.next_page
                        }

                        return (
                            <div key={index}>
                                {requestInfo.page > 3 && (
                                    <>
                                    <button title="First button slide page" className="mr-3" onClick={() => getVideos(1)} type="submit"><div className={classes}>1</div></button>
                                    <button title="..." className="mr-3" type="submit"><div className={classes}>...</div></button>
                                    </>
                                )}
                                {previousPage > 0 && (
                                    <button title="First button slide page" className="mr-3" onClick={() => getVideos(requestInfo.page-1)} type="submit"><div className={classes}>{requestInfo.page-1}</div></button>
                                )}
                                <button className="mr-3" type="submit"><div className={classes+active}>{requestInfo.page}</div></button>
                                {nextPage > 0 && (
                                    <button title="Second button slide page" className="mr-3" onClick={() => getVideos(requestInfo.page+1)} type="submit"><div className={classes}>{requestInfo.page+1}</div></button>
                                )}
                                {next2Page > 0 && (
                                    <button title="Third button slide page" className="mr-3" onClick={() => getVideos(requestInfo.page+2)} type="submit"><div className={classes}>{requestInfo.page+2}</div></button>
                                )}
                                <button title="Total pages" className="mr-3" type="submit"><div className={classes}>Total {isNaN(requestInfo.total_pages) ? 0 : requestInfo.total_pages}</div></button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;

if (document.getElementById('react-root')) {
    const Index = ReactDOM.createRoot(document.getElementById("react-root"));

    Index.render(
        <React.StrictMode>
            <Home/>
        </React.StrictMode>
    )
}
