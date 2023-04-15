<?php
namespace App\Repositories;

use App\Models\Appointment;

class AppointmentsRepository
{
    private $oAppointmentsModel;

    public function __construct(Appointment $oAppointmentsModel)
    {
        $this->oAppointmentsModel = $oAppointmentsModel;
    }

    public function fetchAppointments($data)
    {
      return $this->oAppointmentsModel->fetchAppointments($data);
    }

    public function addAppointments(array $appointment)
    {
      return $this->oAppointmentsModel->addAppointments($appointment);
    }

    public function getAppointmentDetails($id)
    {
      return $this->oAppointmentsModel->getAppointmentDetails($id);
    }
}
