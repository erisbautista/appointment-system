<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UsersService;

class UsersController extends Controller
{
    protected $oRequest;
    protected $oUserService;

    public function __construct(Request $oRequest, UsersService $oUserService)
    {
        $this->oRequest = $oRequest;
        $this->oUserService = $oUserService;
    }

    public function loginUser()
    {
        return response()->json($this->oUserService->loginUser($this->oRequest->all()));
    }

    public function registerUser()
    {
        return response()->json($this->oUserService->registerUser($this->oRequest->all()));
    }

    public function fetchUsers()
    {
        return response()->json($this->oUserService->fetchUsers());
    }
}
