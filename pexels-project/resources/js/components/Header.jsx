import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const Header = ({ 
    selectedLocale, 
    setSelectedLocale, 
    selectedResolution, 
    setSelectedResolution,
    getVideos
}) => {

    useEffect(() => {
        const searchValue = sessionStorage.getItem("search") || "";
        const localesValue = sessionStorage.getItem("locales") || "";
        const sizesValue = sessionStorage.getItem("sizes") || "";

        if(searchValue != ''){

            // Set values for text inputs
            const searchElements = document.querySelectorAll('.search-input');
            searchElements.forEach((el, index) => {
                el.value = searchValue;
            });

            // Set checked state for locale checkboxes
            const localeElements = document.querySelectorAll('.locale');
            localeElements.forEach(el => {
                if (localesValue == el.getAttribute('value')) {
                    el.checked = true;
                    setSelectedLocale(el.getAttribute('value'));
                }
            });

            // Set checked state for size checkboxes
            const sizeElements = document.querySelectorAll('.size');
            sizeElements.forEach(el => {
                if (sizesValue == el.getAttribute('value')) {
                    el.checked = true;
                    setSelectedResolution(el.getAttribute('value'))
                }
            });

            sessionStorage.setItem("search", "");
            sessionStorage.setItem("locales", "");
            sessionStorage.setItem("sizes", "");
            
            getVideos(1);
        }

    }, []);  

    const goHome = (video) => {
        window.location.href = "/";
    }

    const closeErrorMessage = () => {
        document.querySelectorAll('.error').forEach(el => {
            el.classList.toggle("d-none");
            el.classList.toggle("d-block");
        });
    }

    const getFilters = async () => {
        document.querySelectorAll('.filter-options').forEach(el => {
            el.classList.toggle("d-none");
            el.classList.toggle("d-block");
        });
    }

    
    const handleLocaleChange = (event) => {
        setSelectedLocale(event.target.value);
    };

    const handleResolutionChange = (event) => {
        setSelectedResolution(event.target.value);
    };

    return (
        <div className="header">
            <div className="row align-items-center justify-content-between">
                {/* Left Section */}
                <div className="col-auto d-flex align-items-center go-home" onClick={() => goHome()}>
                    <img src="/assets/pexels_logo_0.png" alt="Pexels logo" width="50" height="50" className="mt-10 ml-10" />
                    <h3 className="pexels-title">Pexels</h3>
                </div>
                {/* Center Section */}
                <div className="col-md-8 d-flex justify-content-center">
                    <div className="search-box-container mt-10 position-relative">
                        <input 
                            type="text" 
                            className="form-control search-input me-2" 
                            placeholder="Pesquisa..." 
                            max="100"
                        />
                        <div className="loader d-none"></div>
                        <div className='error d-none'>
                            <div className="card-body">
                                <h5 className="card-title">Validação</h5>
                                <p className="card-text text-center error_message mt-10"></p>
                                <div className="center">
                                    <button title="Close" type="submit" onClick={() => closeErrorMessage()}><div className="icon-header pd-12 mt-10 ml-10 fa fa-check"></div></button>
                                </div>
                            </div>
                        </div>
                        {/* Filter Options Box */}
                        <div className="filter-options position-absolute bg-white shadow-sm p-3 rounded w-100 d-none">
                            <div className="row">
                                <b>Localidades</b> 
                                <input type="checkbox" name="filterLocale" value="spain" className='check-option locale' onChange={handleLocaleChange} checked={selectedLocale === "spain"}></input> <div className='option'>Espanha</div>
                                <input type="checkbox" name="filterLocale" value="italy" className='check-option locale' onChange={handleLocaleChange} checked={selectedLocale === "italy"}></input> <div className='option'>Itália</div>
                                <input type="checkbox" name="filterLocale" value="japan" className='check-option locale' onChange={handleLocaleChange} checked={selectedLocale === "japan"}></input> <div className='option'>Japão</div>
                            </div>
                            <div className="row mt-2">
                                <span className="fw-bold">Resoluções</span> 
                                <input type="checkbox" name="filterResolution" value="hd" className='check-option size' onChange={handleResolutionChange} checked={selectedResolution === "hd"}></input> <div className='option'>HD</div>
                                <input type="checkbox" name="filterResolution" value="full_hd" className='check-option size' onChange={handleResolutionChange} checked={selectedResolution === "full_hd"}></input> <div className='option'>Full HD</div>
                                <input type="checkbox" name="filterResolution" value="4k" className='check-option size' onChange={handleResolutionChange} checked={selectedResolution === "4k"}></input> <div className='option'>4K</div>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter Buttons */}
                    <button className='header-btns' title="Pesquisar" type="submit" onClick={() => getVideos()}><i className="icon-header pd-12 mt-10 ml-10 fa fa-search"></i></button>
                    <button className='header-btns' title="Filtrar" type="submit" onClick={() => getFilters()}><i className="icon-header pd-12 mt-10 ml-10 fa fa-filter"></i></button>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
};
    
export default Header;
    