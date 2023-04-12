@extends('layouts.admin')

@section('content')

<h2 class="py-4">Create a new Project</h2>
@include('partials.errors')
<form action="{{route('admin.projects.store')}}" method="post" enctype="multipart/form-data">
    @csrf
    <div class="mb-4">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror" placeholder="project x" aria-describedby="nameHelper" value="{{old('name')}}">
        <small id="nameHelper" class="text-muted">Type the project name, max: 200 characters</small>
    </div>
    <div class="mb-4">
        <label for="client_name">Client Name</label>
        <input type="text" name="client_name" id="client_name" class="form-control @error('client_name') is-invalid @enderror" placeholder="xyz" aria-describedby="client_nameHelper" value="{{old('client_name')}}">
        <small id="client_nameHelper" class="text-muted">Type the client name, max: 200 characters</small>
    </div>

    <div class="mb-4">
        <label for="cover_image">cover_image</label>
        <input type="file" name="cover_image" id="cover_image" class="form-control  @error('cover_image') is-invalid @enderror" placeholder="Learn php article" aria-describedby="cover_imageHelper">
        <small id="cover_imageHelper" class="text-muted">Type the project cover_image</small>
    </div>
    <div class="mb-3">
        <label for="type_id" class="form-label">Types</label>
        <select class="form-control @error('type_id') is-invalid @enderror" name="type_id" id="type_id">
            <option value="" disabled>Select a type</option>
            @foreach($types as $type)
            <option value="{{$type->id}}" {{ $type->id == old('type_id') ? 'selected' : '' }}>{{$type->name}}</option>
            @endforeach
        </select>
    </div>

    <div class="mb-3">
        <label for="technologies" class="form-label">
            Technologies
        </label>
        <select multiple class="form-select" name="technologies[]" id="technologies" aria-label="technologies">
            <option value="" disabled>Select technologies</option>
            @forelse ($technologies as $technology )
            <option value="{{$technology->id}}">{{ $technology->name}} </option>

            @empty
            <option value="">No Technologies yet </option>
            @endforelse
        </select>
    </div>

    <div class="mb-4">
        <label for="summary">Content</label>
        <textarea class="form-control  @error('summary') is-invalid @enderror" name="summary" id="summary" rows="4">
        {{old('summary')}}
        </textarea>
    </div>

    <button type="submit" class="btn btn-primary">Add Project</button>

</form>

@endsection
