<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Roles;
use App\Models\Appointment;
use ESolution\DBEncryption\Traits\EncryptedAttribute;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, EncryptedAttribute;

    protected $table = 'users';

    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role',
        'name',
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be encrypted on save.
     *
     * @var array
     */
    protected $encryptable = [
        'name', 'username', 'email','password'
    ];

    public function appointment()
    {
        return $this->hasMany(Appointment::class, 'user_id', 'user_id');
    }

    public function loginUser($aData)
    {
        return $this::whereEncrypted('username', $aData['username'])
        ->first();
    }

    public function registerUser($aData)
    {
        return $this::create($aData);
    }

    public function fetchUsers()
    {
        return $this::withCount('appointment')
        ->where('role', '=', 'member')
        ->get();
    }
}
