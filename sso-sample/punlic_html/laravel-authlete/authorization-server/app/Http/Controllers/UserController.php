<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class UserController extends Controller
{
    function index(Request $request)
    {
        // echo json_encode($request->input());
        file_put_contents(".test.txt", json_encode($request->input()));
        // $all = User::where(['email' => ]);
        // dd($all);
    }
}