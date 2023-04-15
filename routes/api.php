<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AppointmentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [UsersController::class, 'loginUser']);
Route::post('/register', [UsersController::class, 'registerUser']);
Route::get('/users', [UsersController::class, 'fetchUsers']);
Route::prefix('appointments')->group(function() {
    Route::get('/', [AppointmentsController::class, 'fetchAppointments']);
    Route::post('/', [AppointmentsController::class, 'addAppointments']);
    Route::get('/{id}', [AppointmentsController::class, 'getAppointmentDetails']);
});

Route::get('/encrypt', function () {
    $encrypted = Crypt::encryptString('Admin');
    print_r($encrypted);
});