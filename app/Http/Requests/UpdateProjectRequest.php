<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', Rule::unique('projects')->ignore($this->project)],
            'type_id' => 'nullable|exists:types,id',
            'client_name' => 'nullable',
            'cover_image' => 'nullable|image|max:500',
            'technologies' => 'exists:technologies,id',
            'summary' => 'nullable',
        ];
    }
}
