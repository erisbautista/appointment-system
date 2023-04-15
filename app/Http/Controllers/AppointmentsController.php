<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AppointmentsService;

class AppointmentsController extends Controller
{
    protected $oRequest;
    protected $oAppointmentsService;

    public function __construct(Request $oRequest, AppointmentsService $oAppointmentsService)
    {
        $this->oRequest = $oRequest;
        $this->oAppointmentsService = $oAppointmentsService;
    }

    public function fetchAppointments()
    {
        return response()->json($this->oAppointmentsService->fetchAppointments($this->oRequest->all()));
    }

    public function addAppointments()
    {
        return response()->json($this->oAppointmentsService->addAppointments($this->oRequest->all()));
    }

    public function getAppointmentDetails($id)
    {
        return response()->json($this->oAppointmentsService->getAppointmentDetails($id));
    }
}
