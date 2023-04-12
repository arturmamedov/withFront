@extends('layouts.admin')


@section('content')




@include('partials.session_message')
@include('partials.errors')

<div class="container">
    <h1 class="my-3">All Project's Types</h1>
    <div class="row">
        <div class="col pe-5">
            <form action="" method="post" class="d-flex align-items-center">
                @csrf
                <div class="input-group mb-3">
                    <input type="text" name="name" class="form-control" placeholder="Project's type" aria-label="Project's type" aria-describedby="button-addon2">
                    <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
                        <i class="fa-solid fa-plus-circle fa-sm fa-fw"></i> Add
                    </button>
                </div>
            </form>
        </div>
        <div class="col">

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
                    @forelse($types as $type)
                    <tr>
                        <td scope="row">{{$type->id}}</td>
                        <td>
                            <form id="type-{{$type->id}}" action="{{route('admin.types.update', $type->slug)}}" method="post">
                                @csrf
                                @method('PATCH')
                                <input class="border-0 bg-transparent" type="text" name="name" value="{{$type->name}}">
                            </form>

                        </td>
                        <td>{{$type->slug}}</td>
                        <td><span class="badge badge-info bg-dark">{{count($type->projects)}}</span></td>
                        <td>
                            <button form="type-{{$type->id}}" type="submit" class="btn btn-primary m-2" title="Update Category">
                                <i class="fa-solid fa-pencil fa-sm fa-fw"></i>
                            </button>
                            <form action="{{route('admin.types.destroy', $type->slug)}}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger text-white m-2" title="Delete Category">
                                    <i class="fa-solid fa-trash fa-sm fa-fw"></i>
                                </button>
                            </form>

                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td scope="row">No categories! Add your first type.</td>

                    </tr>
                    @endforelse
                </tbody>
            </table>


        </div>

    </div>
</div>


@endsection
