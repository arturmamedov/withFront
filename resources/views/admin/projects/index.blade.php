@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between py-4">
        <h1>All Projects</h1>
        <div>
            <a href="{{route('admin.projects.create')}}" class="btn btn-primary">
                <i class="fas fa-plus-circle fa-sm fa-fw"></i> Add Project
            </a>
        </div>
    </div>

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
                    <!-- Inclusione immagini di segnaposto caricate tramite $faker->imageUrl() -->
                    {{-- <img width="150" src="{{$project->cover_image}}" alt="Cover image {{$project->name}}"> --}}
                    <!-- Inclusione immagini caricate tramite input:file  -->
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


                                    <form action="{{route('admin.projects.destroy', $project->slug)}}" method="post">
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
