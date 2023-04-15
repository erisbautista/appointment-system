<?php
namespace App\Services;

use App\Repositories\AppointmentsRepository;

class AppointmentsService
{
  private $oAppointmentRepository;

  public function __construct(AppointmentsRepository $oAppointmentRepository)
  {
    $this->oAppointmentRepository = $oAppointmentRepository;
  }

  public function fetchAppointments($data)
  {
    return $this->oAppointmentRepository->fetchAppointments($data);
  }

  public function addAppointments(array $appointment)
  {
    return $this->oAppointmentRepository->addAppointments($appointment);
  }

  public function getAppointmentDetails($id)
  {
      return $this->oAppointmentRepository->getAppointmentDetails($id);
  }
}
