<?php

namespace Database\Seeders;

use App\Models\Project;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for ($i = 0; $i < 10; $i++) {
            $project = new Project();
            $project->name = $faker->domainName();
            $project->slug = Str::slug($project->name, '-');
            $project->client_name = $faker->domainWord();
            $project->summary = $faker->text(300);
            /* TODO: per far funzionare il seeder anche con le immagini caricate
            tramite ui dall'utente, bisogna usare $faker->image() ma al momento sembra non funzionare piú */
            $project->cover_image = $faker->imageUrl(600, 300, 'Projects', false, false);

            $project->save();
        }
    }
}
