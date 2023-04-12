<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Models\Technology;
use App\Models\Type;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //dd(Project::all());
        $projects = Project::orderByDesc('id')->get();

        return view('admin.projects.index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $types = Type::all();
        $technologies = Technology::all();

        return view('admin.projects.create', compact('types', 'technologies'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProjectRequest $request)
    {
        //validate data
        $valData = $request->validated();
        //dd($valData);

        if ($request->hasFile('cover_image')) {
            $file_path = Storage::disk('public')->put('cover_images', $request->cover_image);
            $valData['cover_image'] = $file_path;
        }

        $valData['slug'] = Str::slug($request->name, '-');
        //dd($valData);
        $project = Project::create($valData);
        if ($request->has('technologies')) {
            $project->technologies()->attach($request->technologies);
        }
        //dd($project);
        return to_route('admin.projects.index')->with('message', 'Project Created Successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        return view('admin.projects.show', compact('project'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        $types = Type::all();
        $technologies = Technology::all();

        return view('admin.projects.edit', compact('project', 'types', 'technologies'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProjectRequest  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //validate the request using ☝ the UpdateProject Form Request
        //dd($request->all());
        $valData = $request->validated();
        //dd($valData);

        // Check if there is a cover_image property and update the field
        if ($request->has('cover_image')) {
            var_dump('Change the image');
            // remove the current immage from the storage (check if the image does not return null )
            if ($project->cover_image) {
                Storage::delete($project->cover_image);
            }

            // save the new image and get the path
            $file_path = Storage::disk('public')->put(
                'cover_images',
                $request->cover_image
            );
            //store the path in the valData
            $valData['cover_image'] = $file_path;
        }

        // Check if the title was edited and if so update the slug
        if ($request->has('name')) {
            var_dump('Change the slug');

            // generate a new slug
            $slug = Str::slug($request->name, '-');
            // add it to the valData
            $valData['slug'] = $slug;
        }

        // update the instance
        $project->update($valData);

        // update the relationship many to many
        if ($request->has('technologies')) {
            $project->technologies()->sync($request->technologies);
        }


        // redirect to a get route
        return to_route('admin.projects.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        // rimuovi associazione tra project e technologies
        $project->technologies()->sync([]);
        // rimuovi file dallo storage
        Storage::delete($project->cover_image);
        // cancella il project
        $project->delete();
        // fai il redirect
        return to_route('admin.projects.index')->with('message', 'Project deleted successfully!');
    }
}
