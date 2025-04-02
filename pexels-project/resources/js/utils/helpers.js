
import React, { useState } from 'react';

const helpers = () => {
    const [videos, setVideos] = useState([]);
    const [requestInfos, setRequestInfos] = useState([{ next_page: '', page: 0, total_results: 0, url: '' }]);
    const [selectedLocale, setSelectedLocale] = useState(null);
    const [selectedResolution, setSelectedResolution] = useState(null);

    const addVideos = (element) => {
        setVideos(prevVideos => [
            ...prevVideos,
            {
                id: element.id,
                height: element.height,
                duration: element.duration,
                image: element.image,
                url: element.url,
                user: element.user,
                video_files: element.video_files
            }
        ]);
    };

    const addRequestInfos = (element) => {
        setRequestInfos(prevRequestInfos => [
            ...prevRequestInfos,
            {
                next_page: element.next_page,
                per_page: element.per_page,
                page: element.page,
                total_results: element.total_results,
                url: element.url
            }
        ]);
    };

    const changeLoader = (element) => {
        document.querySelectorAll('.loader').forEach(el => {
            el.classList.toggle("d-none");
            el.classList.toggle("d-block");
        });
    }

    const getVideos = async (page = 1) => {
        const search = Array.from(document.querySelectorAll('.search-input'))
        .map(el => el.value);

        const locales = Array.from(document.querySelectorAll('.locale:checked'))
        .map(el => el.getAttribute('value'));

        const sizes = Array.from(document.querySelectorAll('.size:checked'))
        .map(el => el.getAttribute('value'));

        if(search[0] == ''){
            document.querySelectorAll('.error_message').forEach(el => {
                el.textContent = "Por favor, preencha o campo Pesquisa"
            });
            document.querySelectorAll('.error').forEach(el => {
                el.classList.toggle("d-none");
                el.classList.toggle("d-block");
            });
        } else {

            const url = window.location.href;
            if(url.includes("fullVideo")){
                sessionStorage.setItem("search", search);
                sessionStorage.setItem("locales", locales[0]);
                sessionStorage.setItem("sizes", sizes[0]);
                window.location.href = "/";
            }

            setVideos([])
            setRequestInfos([])

            changeLoader()

            var perPage = 16

            document.querySelectorAll('.fa-list-ul.active').forEach(el => {
                perPage = 10
            });

            const queryString = new URLSearchParams({
                locales: locales.join(','),
                sizes: sizes.join(','),
                search: search,
                per_page: perPage,
                page: page
            }).toString();

            const response = await fetch(`http://127.0.0.1:8000/getVideos?${queryString}`);
            const data = await response.json();

            if(data['response'] == 'success'){    
                var videos = data['body']['videos'];
                addRequestInfos(data['body'])
                videos.forEach(el => {
                    addVideos(el)
                });

            } else {
                document.querySelectorAll('.error_message').forEach(el => {
                    el.textContent = data['body']
                });
                document.querySelectorAll('.error').forEach(el => {
                    el.classList.toggle("d-none");
                    el.classList.toggle("d-block");
                });
            }

            changeLoader()
        }
    }

    return {
        videos,
        setVideos,
        requestInfos,
        setRequestInfos,
        selectedLocale,
        setSelectedLocale,
        selectedResolution,
        setSelectedResolution,
        addVideos,
        addRequestInfos,
        getVideos
    };
};

export default helpers;