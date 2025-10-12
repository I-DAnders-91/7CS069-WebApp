<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = ['objective','subject','year_group','date','success_criteria','activities','useful_links'];
    protected $casts = ['date'=>'date', 'useful_links'=>'array'];
}
