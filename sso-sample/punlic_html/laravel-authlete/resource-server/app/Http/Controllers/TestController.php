<?php
namespace App\Http\Controllers;

use Authlete\Api\AuthleteApi;
use Authlete\Laravel\Web\AccessTokenValidator;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function __invoke(Request $request, AuthleteApi $api)
    {
        $validator = AccessTokenValidator::create(
            $api, $request, ['email', 'profile']);

        if (!$validator->validate())
        {   
            return $validator->getErrorResponse();
        }

        return response()->json(getdate());
    }   
}