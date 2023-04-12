@extends('layouts.admin')


@section('content')




@include('partials.session_message')
@include('partials.errors')

<div class="container">
    <h1 class="my-3">All Technologies</h1>
    <div class="row">
        <div class="col pe-5">
            <form action="" method="post" class="d-flex align-items-center">
                @csrf
                <div class="input-group mb-3">
                    <input type="text" name="name" class="form-control" placeholder="
                    Add a technology name here " aria-label="project's technology" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Add</button>
                </div>
            </form>
        </div>
        <div class="col h-75 overflow-auto">

            <table class="table table-striped table-inverse table-responsive">
                <thead class="thead-inverse">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Posts Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($technologies as $tech)
                    <tr>
                        <td scope="row">{{$tech->id}}</td>
                        <td>
                            <form id="tech-{{$tech->id}}" action="{{route('admin.technologies.update', $tech->slug)}}" method="post">
                                @csrf
                                @method('PATCH')
                                <input class="border-0 bg-transparent" type="text" name="name" value="{{$tech->name}}">
                            </form>

                        </td>
                        <td>{{$tech->slug}}</td>
                        <td><span class="badge badge-info bg-dark">{{count($tech->projects)}}</span></td>
                        <td>
                            <button form="tech-{{$tech->id}}" type="submit" class="btn btn-primary m-2" title="Update Tag">
                                <i class="fa-solid fa-pencil fa-sm fa-fw"></i>
                            </button>
                            <form action="{{route('admin.technologies.destroy', $tech->slug)}}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger text-white m-2" title="Delete Tag">
                                    <i class="fa-solid fa-trash fa-sm fa-fw"></i>
                                </button>
                            </form>

                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td scope="row">No technologies! Add your first tech.</td>

                    </tr>
                    @endforelse
                </tbody>
            </table>


        </div>

    </div>
</div>


@endsection
