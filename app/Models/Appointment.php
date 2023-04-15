<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointment';

    protected $primaryKey = 'appointment_id';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'appointment_date'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function fetchAppointments($data)
    {
        $query = $this::with('users');
        if($data['role'] !== 'admin') {
            $query->where('user_id', '=', $data['user_id']);
        }
        return $query->get();
    }

    public function addAppointments($appointment)
    {
        return $this::insertGetId($appointment);
    }

    public function getAppointmentDetails($id)
    {
        return $this::with('users')->find($id);
    }
}
