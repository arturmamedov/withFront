<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TechnologyController;
use App\Http\Controllers\Admin\TypeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // risponde all'url /admin
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('projects', ProjectController::class)->parameters([
        'projects' => 'project:slug',
    ]);

    /* Route resources for project's types */
    Route::resource('types', TypeController::class)->parameters([
        'types' => 'type:slug',
    ])->except(['show', 'create', 'edit']);

    /* Route resources for project's technologies */
    Route::resource(
        'technologies',
        TechnologyController::class
    )->parameters([
        'technologies' => 'technology:slug',
    ])->except(['show', 'create', 'edit']);
});

require __DIR__.'/auth.php';
