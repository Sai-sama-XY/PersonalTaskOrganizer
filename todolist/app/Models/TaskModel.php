<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskModel extends Model
{

    public function user()
{
    return $this->belongsTo(User::class);
}

    protected $table = 'todos';
    protected $fillable = ['user_id','title','description','is_completed','task_status','priority','deadline'];
}
