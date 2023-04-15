<?php
namespace App\Repositories;

use App\Models\User;

class UsersRepository
{
    private $oUsersModel;

    public function __construct(User $oUsersModel)
    {
        $this->oUsersModel = $oUsersModel;
    }

    public function loginUser($aData)
    {
      return $this->oUsersModel->loginUser($aData);
    }

    public function registerUser($aData)
    {
      return $this->oUsersModel->registerUser($aData);
    }

    public function fetchUsers()
    {
      return $this->oUsersModel->fetchUsers();
    }
}
