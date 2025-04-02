import ReactDOM from 'react-dom/client';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import helpers from '../utils/helpers';

function FullVideo() {

    const { 
        selectedLocale, setSelectedLocale, 
        selectedResolution, setSelectedResolution,
        getVideos
    } = helpers();

    const urlParams = new URLSearchParams(window.location.search);
    const video_files = JSON.parse(sessionStorage.getItem("video_files"));
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [currentSource, setCurrentSource] = useState("");

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;

        const hdVideo = video_files.find(video => video.link.includes("hd")) || video_files[0];
        const sdVideo = video_files.find(video => video.link.includes("sd")) || video_files[0];

        setSelectedVideo(isMobile ? sdVideo : hdVideo);

        var currentSrc = '';
        if(isMobile){
            currentSrc = sdVideo.quality
        } else {
            currentSrc = hdVideo.quality;
        }

        setCurrentSource(currentSrc);
    }, []);

    return (
        <div className="container">
            <Header selectedLocale ={selectedLocale} setSelectedLocale={setSelectedLocale} 
                selectedResolution={selectedResolution} setSelectedResolution={setSelectedResolution}
                getVideos={getVideos} />
            <div className="body row align-items-center">
                <div className="full-video row align-items-center">
                    <div className='full-card center' key={urlParams.get('id')}>
                        <video style={{ maxWidth: "100%", height: "auto" }} controls>
                            {selectedVideo && <source src={selectedVideo.link} type={selectedVideo.file_type} />}
                        </video>
                    </div>
                    <div className='card info-card row align-items-center'>
                        <p className='author-name-fullVideo'>{urlParams.get('author_name')}</p>
                        <p>ID: {urlParams.get('id')}</p>
                        <p>Resolução: {currentSource}</p>
                        <p>Duração: {urlParams.get('duration')} segundos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
    
export default FullVideo;

if (document.getElementById('react-full-video')) {
    const Index = ReactDOM.createRoot(document.getElementById("react-full-video"));

    Index.render(
        <React.StrictMode>
            <FullVideo/>
        </React.StrictMode>
    )
}