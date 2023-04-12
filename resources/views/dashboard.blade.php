@extends('layouts.admin')

@section('content')
<div class="container-fluid">

    <div class="card mt-5">
        <div class="card-header">{{ __('Dashboard') }}</div>

        <div class="card-body">
            @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
            @endif

            {{ __('You are logged in!') }}
            {{__('Use these quick links below to manage your portfolio entries')}}

            <div class="actions mt-5">
                <a href="{{ route('admin.projects.index') }}" class="btn btn-primary">
                    <i class="fas fa-plus-circle"></i> Add Project
                </a>
                <a href="{{ route('admin.types.index') }}" class="btn btn-secondary">
                    <i class="fas fa-plus-circle"></i> Add Type
                </a>
                <a href="{{ route('admin.technologies.index') }}" class="btn btn-dark">
                    <i class="fas fa-plus-circle"></i> Add Technology
                </a>
            </div>
        </div>
    </div>

</div>
@endsection
