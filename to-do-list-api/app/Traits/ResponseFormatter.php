<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ResponseFormatter
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function success($data = [], string $message = 'Success', int $code = Response::HTTP_OK)
    {
        data_set($response, 'code', $code);
        data_set($response, 'message', $message);

        if ($data) {
            data_set($response, 'data', $data);
        }

        return response()->json($response, $code);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function notFound(string $message = 'Not found', int $code = Response::HTTP_NOT_FOUND)
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
        ], $code);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function error(string $message = 'Error', array $data = [], int $code = Response::HTTP_INTERNAL_SERVER_ERROR)
    {
        data_set($response, 'code', $code);
        data_set($response, 'message', $message);

        if ($data) {
            data_set($response, 'data', $data);
        }

        return response()->json($response, $code);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function errorValidator($error_parameters = [], string $message = 'Error', int $code = Response::HTTP_UNPROCESSABLE_ENTITY)
    {
        // create addional message
        $count = count($error_parameters) - 1;
        $error = $count > 1 ? 'errors' : 'error';
        $additonal_error = count($error_parameters) > 1 ? ' (and ' . $count . ' more ' . $error .')' : '';

        return response()->json([
            'code' => $code,
            'message' => $error_parameters[array_key_first($error_parameters)][0] . $additonal_error,
            'error_parameters' => $error_parameters
        ],  $code);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function unauthorized(string $message = 'Unauthorized', int $code = Response::HTTP_UNAUTHORIZED)
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
        ], $code);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function forbidden(string $message = 'Forbidden', int $code = Response::HTTP_FORBIDDEN)
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
        ], $code);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function badRequest(string $message = 'Bad Request', int $code = Response::HTTP_BAD_REQUEST)
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
        ], $code);
    }
}
