<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FullVideoController;

Route::get('/', [HomeController::class, 'index']);
Route::get('/getVideos', [HomeController::class, 'getVideos']);
Route::get('/fullVideo', [FullVideoController::class, 'index']);