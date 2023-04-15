<?php
namespace App\Services;

use App\Repositories\UsersRepository;

class UsersService
{
  private $oUserRepository;

  public function __construct(UsersRepository $oUserRepository)
  {
    $this->oUserRepository = $oUserRepository;
  }

  public function loginUser($aData)
  {
    $aResult = $this->oUserRepository->loginUser($aData);
    return $this->validateLoginResult($aData, $aResult);
  }

  public function registerUser($aData)
  {
    return $this->oUserRepository->registerUser($aData);
  }

  public function fetchUsers()
  {
    return $this->oUserRepository->fetchUsers();
  }

  private function validateLoginResult($aData, $aResult)
  {
    if (empty($aResult) === true) {
      return [
        'code' => 404,
        'message' => 'username does not exist!'
      ];
    }
    if ($aData['password'] !== $aResult['password']) {
      return [
        'code' => 403,
        'message' => 'Incorrect password!'
      ];
    }
    return [
      'code' => 200,
      'users' => $aResult
    ];  
  }
}
