<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class FullVideoController
{
    function index(){
        return view('fullVideo');
    }
}