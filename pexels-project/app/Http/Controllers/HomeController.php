<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class HomeController
{
    function index(){
        return view('home');
    }

    function getVideos(Request $request){
        $authKey = getenv('REACT_APP_AUTHORIZATION_KEY');

        $response = Http::withHeaders([
            'Authorization' => $authKey
        ])->get('https://api.pexels.com/videos/search', [
            'query' => $request->query("search"),
            'locale' => $request->query("locales"),
            'size' => $request->query("sizes"),
            'per_page' => $request->query("per_page"),
            'page' => $request->query("page"),
        ]);
        $response_code = 'success';
        $body = json_decode($response->body(), true);
        if(isset($body['status'])){
            $status = $body['status'];
            switch ($status) {
            
                case '400':
                    $body = "Operação inválida.";
                    break;
            
                case '401':
                    $body = "Não Autorizado.";
                    break;
            
                case '403':
                    $body = "Acesso proibido.";
                    break;
            
                case '404':
                    $body = "Recurso não encontrado.";
                    break;
            
                case '500':
                    $body = "Erro interno do servidor.";
                    break;
            
                case '503':
                    $body = "Serviço indisponível no momento.";
                    break;
            
                default:
                    $body = "Não foi possível realizar a operação.";
                    break;
            }                    
            $response_code = 'error';
        }

        return response()->json(['response' => $response_code, 'body' => $body]);
    }
}
