import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actions-select',
  imports: [],
  templateUrl: './actions-select.html',
  styleUrl: './actions-select.scss',
})
export class ActionsSelect {
  @Output() optionChanged = new EventEmitter<string>();
  @Output() isDelete = new EventEmitter<boolean>();

  onChange(event: any) {
    if (event.target.value === 'add') {
      this.optionChanged.emit('Adicionar')
      this.isDelete.emit(false)
    } else if (event.target.value === 'edit') {
      this.optionChanged.emit('Editar')
      this.isDelete.emit(false)
    } else if (event.target.value === 'delete') {
      this.optionChanged.emit('Deletar')
      this.isDelete.emit(true)
    }
  }
}
