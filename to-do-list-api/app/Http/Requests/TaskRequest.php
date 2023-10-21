<?php

namespace App\Http\Requests;

use App\Traits\ResponseFormatter;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class TaskRequest extends FormRequest
{
    use ResponseFormatter;
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'description' => ['required', 'max:200', 'min:10', Rule::unique('tasks', 'description')->ignore($this->tasks)]
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'description.required' => 'The Task description is requiresssd!.',
            'description.max'      => 'The Task must be a maximum of 200 characters!.',
            'description.unique'   => 'The Task description is already exist.',
        ];

    }

    /**
    * Get the error messages for the defined validation rules.*
    * @return array
    */
    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();

        throw new HttpResponseException($this->errorValidator($errors));
    }
}
