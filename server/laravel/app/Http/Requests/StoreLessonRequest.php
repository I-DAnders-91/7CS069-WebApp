<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLessonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //TODO: Implement authorisation logic
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'objective'         =>  'required|string|max:160',
            'subject'           =>  'required|string|max:60',
            'year_group'        =>  'required|string|max:20',
            'date'              =>  'required|date',
            'success_criteria'  =>  'nullable|string|max:255',
            'activities'        =>  'nullable|string',
            'useful_links'      =>  'nullable|array',
            'useful_links.*'    =>  'url',
        ];
    }
}
