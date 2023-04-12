<h1>Ciao admin!</h1>
<p>
		Hai ricevuto un nuovo messaggio, ecco qui i dettagli:<br>
		Nome: {{ $lead->name }}<br>
		Telefono: {{ $lead->phone_number }}<br>
        Email: {{ $lead->email }}<br>
		Messaggio:<br>
		{{ $lead->message }}
</p>