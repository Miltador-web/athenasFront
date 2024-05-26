import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent {
  newItemForm: FormGroup;
  @Output() pessoaAdicionadaOuEditada = new EventEmitter(); // Usar o decorator @Output para emitir eventos

  constructor(
    private fb: FormBuilder,
    private service: ProjectService,
    public dialogRef: MatDialogRef<AddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.newItemForm = this.fb.group({
      nome: [data ? data.nome : '', Validators.required],
      sexo: [data ? data.sexo : '', Validators.required],
      altura: [data ? data.altura : '', [Validators.required, Validators.min(0)]],
      peso: [data ? data.peso : '', [Validators.required, Validators.min(0)]],
      dataNascimento: [data ? data.dataNascimento : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.newItemForm.valid && this.data != null){
      this.editarPessoa(this.data.id, this.newItemForm.value);
    }
    else if (this.newItemForm.valid) {
      this.registrarPessoa();
    }
  }

  registrarPessoa(): void {
    this.service.adicionarPessoa(this.newItemForm.value).subscribe(() => {
      // Emitir evento quando a pessoa for adicionada com sucesso
      this.pessoaAdicionadaOuEditada.emit();
      this.dialogRef.close();
    }, error => {
      console.error('Erro ao adicionar pessoa:', error);
    });
  }

  editarPessoa(id: number, pessoa: any): void {
    this.service.editarPessoa(id, pessoa).subscribe(() => {
      // Emitir evento quando a pessoa for editada com sucesso
      this.pessoaAdicionadaOuEditada.emit();
      this.dialogRef.close();
    }, error => {
      console.error('Erro ao editar pessoa:', error);
    });
  }
}
