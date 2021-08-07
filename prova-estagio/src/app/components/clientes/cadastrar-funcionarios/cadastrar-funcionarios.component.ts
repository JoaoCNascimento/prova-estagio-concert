import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClientesApiService } from 'src/app/services/clientes-api.service';

@Component({
  selector: 'app-cadastrar-clientes',
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.sass']
})
export class CadastrarClientesComponent implements OnInit {

  form: FormGroup;
  faTimes = faTimes

  formValido: boolean = true;

  areaDeAtuacao: string[] = [
    "Backend",
    "Frontend",
    "DBA",
    "Analista",
    "Outro"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private clientesApiService: ClientesApiService,

  ) { }

  onCheckBoxChange(e) {
    const formArray: FormArray = this.form.get('areaDeAtuacao') as FormArray;

    if (e.target.checked) {
      formArray.push(new FormControl(e.target.value))
    }
    else {
      formArray.removeAt(formArray.controls.findIndex(i => i.value === e.target.value))
    }
  }

  ngOnInit(): void {
    this.configurarForm();
  }

  configurarForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required]]
    });
  }

  submit() {
    if (this.form.valid === false) {
      this.formValido = false;
      this.form.markAllAsTouched();
    }
    else {
      this.clientesApiService.createCliente(this.form.value);
    }
  }
}
