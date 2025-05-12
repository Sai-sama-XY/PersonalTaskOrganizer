<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class UserModel extends Model
{
    use HasApiTokens;
    
    protected $table = 'users';

    protected $fillable = ['name','email','password'];
}
