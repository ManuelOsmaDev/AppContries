import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-paises-selector',
  templateUrl: './paises-selector.component.html',
  styleUrls: ['./paises-selector.component.scss'],
})
export class PaisesSelectorComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region:   ['', Validators.required],
    pais:     ['', Validators.required],
    frontera: ['', Validators.required],
  });

  guardar() {
    console.log(this.miFormulario.value);
  }
  regiones: string[]  = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.regiones = this.servicesService.regiones;
    this.miFormulario.get('region')?.valueChanges
    .pipe(
        tap( (_)=>{
          this.miFormulario.get('pais')?.reset('')
        } ),
      switchMap( region =>this.servicesService.getPaisesPorRegion(region) )
    )
    .subscribe(paises =>{
      console.log(paises);
      this.paises = paises
    })

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        switchMap(codigo => this.servicesService.getPaisPorCodigo(codigo))
      ).subscribe(pais=>{
        this.fronteras = pais?.borders || [];
      })
  }
}
