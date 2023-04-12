# Laravel 9 - Auth/Breeze - Boolfolio

```bash
# Istalla laravel 9 e committa
laravel new 633-auth-boolfolio --git
# Istalla breeze
cd 633-auth-boolfolio
composer require laravel/breeze --dev
# scaffold dell'autenticazione breeze/blade
php artisan breeze:install
# Installa preset laravel 9 bootstrap vite
composer require pacificdev/laravel_9_preset
# Esegui comando preset
php artisan preset:ui bootstrap --auth
npm i
npm run dev
```

## Connessione db e migrazione

Connessione al db

```bash
mysql -uroot -proot
```

creazione del database

```sql
CREATE DATABASE laravel_boolfolio;
exit;
```

Modificare file .env con credenziali per connessione al database.

```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_boolfolio
DB_USERNAME=root
DB_PASSWORD=root

```

Migrate all db tables

```bash
php artisan migrate

```

## Refactor dashboard route

In questa fase facciamo un refactoring della rotta `/dashboard` servendo la view da un controller dedicato e modificando la rotta di conseguenza:

- crea controller
- crea metodo index nel controller
- modifica rotta
- creazione gruppo di rotte
- modifica del RouteServiceProvider

crea un controller nel namespace Admin dove spostare la logica della rotta per
la dashboard

```bash
php artisan make:controller Admin/DashboardController
```

implementa metodo index nel DashboardController

```php
    public function index()
    {
        return view('dashboard');
    }
```

modifica la rotta

```php
// Importa la classe DashboardController all'inizio del file
use App\Http\Controllers\DashboardController;

//....
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
```

inserisci la rotta in un gruppo di rotte protette dalle middleware auth e verified e che usano il prefisso admin/

```php


Route::middleware(['auth', 'verified'])->prefix('admin')->namespace('Admin')->name('admin.')->group(function () {
    
    // risponde all'url /admin
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard'); 
   
});

```

modifica del percorso della costante HOME nel file RouteServiceProvider

```php
public const HOME = '/admin';
```

🤓 Ricorda di modificare anche il link alla dashboard nel layout.app settando l'url su admin `url('/admin')`

## Add the Project model

In questa fase usiamo `make:model` con l'opzione -a per generare in un colpo solo
tutti i file di cui necessitiamo per le operazioni CRUD sul modello Project.

NOTA: Il comando con l'opzione all ora aggiunge anche due file di form request per la validazione
Un file per le Policy. Manteniamo i files per implementare la validazione ma togliamo la Policy e la Factory.

```bash

php artisan make:model -a Project
```

Il controller verrá generato e messo nella cartella Http/Controllers, spostiamolo nella cartella /Admin.
Ricordiamo di modificare il namespace `namespace App\Http\Controllers\Admin;` e di importare la classe Controller `use App\Http\Controllers\Controller;` altrimenti il controller non funzionerá.

## Aggiunta delle rotte

Nel gruppo di rotte dove abbiamo definito anche la rotta per la dashboard aggiungiamo anche una rotta di tipo
resource per i Progetti.

```php
// Rimuovere il namespace dal gruppo
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // risponde all'url /admin
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('projects', ProjectController::class)->parameters([
        'project' => 'project:slug',
    ]);
});
```

nella rotta qui sopra, utilizziamo il metodo parameters che accetta un array di parametri
da usare nelle rotte con parametro e modifichiamo il paramentro dall'id di default a slug con `project:slug`(sará necessario nella migrazione aggiungere una colonna slug).

## Verifica funzionamento rotte

```bash
php artisan route:list
```

## Definizione Migrazione e Seeder

Iniziamo con la definizione della migrazione

```php
// _create_projects_table.php

Schema::create('projects', function (Blueprint $table) {
      $table->id();
      $table->string('name', 200);
      $table->string('slug');
      $table->string('client_name', 200)->nullable();
      $table->text('summary')->nullable();
      $table->string('cover_image')->nullable();
      $table->timestamps();
  });

```

passiamo poi al seeder, usiamo faker per velocizzare ma volendo si puó anche usare il metodo con lettura
del csv se si é preparato il file.

```php

// ProjectSeeder.php
public function run(Faker $faker)
    {
        for ($i = 0; $i < 10; $i++) {
            $project = new Project();
            $project->name = $faker->domainName();
            $project->slug = Str::slug($project->name, '-');
            $project->client_name = $faker->domainWord();
            $project->summary = $faker->text(300);
            // NOTA
            $project->cover_image = $faker->imageUrl(600, 300, 'Projects', false, false);
            $project->save();
        }
    }
```

NOTA: per far funzionare il seeder anche con le immagini caricate tramite ui dall'utente, bisogna usare $faker->image() ma al momento sembra non funzionare piú.

Ora effettuiamo la migrazione ed il seeder

```bash
php artisan migrate
php artisan db:seed --class ProjectSeeder

```

## Definire layout admin

```php
/* layouts/admin.blade.php */
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fontawesome 6 cdn -->
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css' integrity='sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==' crossorigin='anonymous' referrerpolicy='no-referrer' />

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Usando Vite -->
    @vite(['resources/js/app.js'])
</head>

<body>
    <div id="app">

        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Boolfolio</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <div class="navbar-nav">
                <div class="nav-item text-nowrap ms-2">
                    <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
                        {{ __('Logout') }}
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </div>
        </header>

        <div class="container-fluid vh-100">
            <div class="row h-100">
                <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-dark navbar-dark sidebar collapse">
                    <div class="position-sticky pt-3">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                {{Route::currentRouteName()}}
                                <a class="nav-link text-white {{ Route::currentRouteName() == 'admin.dashboard' ? 'bg-secondary' : '' }}" href="{{route('admin.dashboard')}}">
                                    <i class="fa-solid fa-tachometer-alt fa-lg fa-fw"></i> Dashboard
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white {{ Route::currentRouteName() == 'admin.projects.index' ? 'bg-secondary' : '' }}" href="{{route('admin.projects.index')}}">
                                    <i class="fa-solid fa-newspaper fa-lg fa-fw"></i> Projects
                                </a>
                            </li>


                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">
                                    <i class="fa-solid fa-users fa-lg fa-fw"></i> Users
                                </a>
                            </li>
                        </ul>


                    </div>
                </nav>

                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    @yield('content')
                </main>
            </div>
        </div>

    </div>
</body>

</html>

```

## CRUD - Show all Projects

Iniziamo con l'implementazione del metodo `index()` nell'`Admin/ProjectController` e restituiamo tutti i progetti
salvati nel db.

```php
    public function index()
    {
        //dd(Project::all()); // 👈 usiamo prima un dd per mostrare i dati a schermo
        // salviamo in una variabile tutti i progetti
        $projects = Project::all(); 
        // restituiamo la view e gli passiamo la variabile
        return view('admin.projects.index', compact('projects')); 
    }
```

Il metodo punta ad una view admin/projects/index.blade.php che bisogna creare.

```html
<!-- admin/projects/index.blade.php -->
@extends('layouts.admin')

@section('content')
<h1>All Projects</h1>
@endsection
```

stampiamo una tabella con tutti i dati dei progeti

```html
@section('content')
<div class="container">
    <div class="d-flex justify-content-between py-4">
        <h1>All Projects</h1>

        <!-- Pulsante add Project NOTA #1-->
        <div>
            <a href="{{route('admin.projects.create')}}" class="btn btn-primary">
                <i class="fas fa-plus-circle fa-sm fa-fw"></i> Add Project
            </a>
        </div>

    </div>
    <!-- Messaggi sessione NOTA #2 -->
    @include('partials.session_message')
    <table class="table table-striped table-inverse table-responsive">
        <thead class="thead-inverse">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Client</th>
                <th>Cover Image</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            @forelse($projects as $project)
            <tr>
                <td scope="row">{{$project->id}}</td>
                <td>{{$project->name}}</td>
                <td>{{$project->slug}}</td>
                <td>
                    <!-- Inclusione immagini di segnaposto caricate tramite $faker->imageUrl()
                    
                    {{-- <img width="150" src="{{$project->cover_image}}" alt="Cover image {{$project->name}}"> --}} -->

                    <!-- NOTA #3 Inclusione immagini caricate tramite input:file  -->
                    <img width="150" src="{{ asset('/storage/' . $project->cover_image)}}" alt="Cover image {{$project->name}}">

                </td>
                <td>
                    <a class="btn btn-primary text-white btn-sm" href="{{route('admin.projects.show', $project->slug)}}" title="View Project">
                        <i class="fa-solid fa-eye fa-sm fa-fw"></i>
                    </a>
                    <a class="btn btn-secondary text-white btn-sm" href="{{route('admin.projects.edit', $project->slug)}}" title="Edit Project">
                        <i class="fa-solid fa-pencil fa-sm fa-fw"></i>
                    </a>

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delete-project-{{$project->id}}" title="Delete Project">
                        <i class="fa-solid fa-trash fa-sm fa-fw"></i>
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="delete-project-{{$project->id}}" tabindex="-1" role="dialog" aria-labelledby="modelTitle-{{$project->id}}" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete current project</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to delete this project?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>


                                    <form action="{{route('admin.projects.destroy', $project->slug)}}" method="project">
                                        @csrf
                                        @method('DELETE')

                                        <button type="submit" class="btn btn-danger">Confirm</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>



                </td>
            </tr>

            @empty
            <tr>
                <td scope="row">No Projects! Create your first project <a href="#">Create project</a></td>
            </tr>
            @endforelse
        </tbody>
    </table>


</div>
@endsection
```

## CRUD - Create and save new projects

## CRUD - Edit and update existing projects

## CRUD - Delete a project
