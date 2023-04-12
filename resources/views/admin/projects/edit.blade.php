@extends('layouts.admin')


@section('content')


<h2 class="py-4">Edit {{$project->title}}</h2>
@include('partials.errors')
<form action="{{route('admin.projects.update', $project->slug)}}" method="post" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="mb-4">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror" placeholder="project xyz" aria-describedby="nameHelper" value="{{old('name', $project->name)}}">
        <small id="nameHelper" class="text-muted">Type the project name, max: 200 carachters</small>
    </div>

    <div class="d-flex">
        <div class="media me-4">
            <img class="shadow" width="150" src="{{asset('storage/' . $project->cover_image)}}" alt="{{$project->name}}">
        </div>
        <div class="mb-4">
            <label for="cover_image" class="mb-3">Replace project image</label>
            <input type="file" name="cover_image" id="cover_image" class="form-control  @error('cover_image') is-invalid @enderror" placeholder="Learn php article" aria-describedby="cover_imageHelper">
            <small id="cover_imageHelper" class="text-muted">Type the project cover_image</small>
        </div>
    </div>

    <div class="mb-3">
        <label for="type_id" class="form-label">Types</label>
        <select class="form-control @error('type_id') is-invalid @enderror" name="type_id" id="type_id">
            <option value="">Select a type</option>
            @forelse($types as $type)

            <option value="{{$type->id}}" {{ $type->id == old('type_id', $project->type ? $project->type->id :'' )  ? 'selected' : ''}}>{{$type->name}}</option>
            @empty
            <option value="" disabled> No types to select</option>
            @endforelse
        </select>
    </div>


    <div class="mb-3">
        <label for="technologies" class="form-label">Technologies</label>
        <select multiple class="form-select" name="technologies[]" id="technologies" aria-label="Technologies">
            <option value="">Select technologies</option>
            @forelse ($technologies as $technology )

            @if($errors->any())
            <option value="{{ $technology->id }}" {{ in_array($technology->id, old('technologies', [])) ? 'selected' : ''}}>{{ $technology->name}} </option>
            @else
            <option value="{{ $technology->id }}" {{ $project->technologies->contains($technology->id) ? 'selected' : ''}}>{{ $technology->name}} </option>
            @endif
            @empty
            <option value="">No Technologies </option>
            @endforelse

        </select>
    </div>

    <div class="mb-4">
        <label for="summary">Summary</label>
        <textarea class="form-control  @error('summary') is-invalid @enderror" name="summary" id="summary" rows="4">
        {{old('summary', $project->summary)}}
        </textarea>
    </div>

    <button type="submit" class="btn btn-primary">Edit Project</button>

</form>



@endsection
