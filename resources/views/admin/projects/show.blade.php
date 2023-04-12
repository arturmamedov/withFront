@extends('layouts.admin')


@section('content')

<div class="projects d-flex py-4">
    <div class="cover_image">
        <img width="400" class="img-fluid" src="{{asset('storage/' . $project->cover_image)}}" alt="{{$project->title}}">
    </div>

    <div class="project-data px-4">
        <h1>{{$project->title}}</h1>
        <div class="metadata">
            <div class="type">
                <strong>Type:</strong> {{$project->type ? $project->type->name : 'Uncategorized'}}
            </div>
            <div class="technologies">
                <strong>Technologies</strong>
                @if (count($project->technologies) > 0)
                @foreach ($project->technologies as $tag )
                <span>#{{$tag->name}} </span>
                @endforeach
                @else
                <span>N/A</span>

                @endif
            </div>

        </div>
        <div class="content">
            {{$project->content}}
        </div>
    </div>
</div>


@endsection
