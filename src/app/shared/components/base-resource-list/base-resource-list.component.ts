import { Component, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.services';

import * as toastr from 'toastr';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(private resourceService: BaseResourceService<T>) { }

    ngOnInit(): void {
        this.resourceService.getAll().subscribe(
            resources => this.resources = resources,
            error => alert("Erro ao carregar a lista")
        )
    }

    deletarDocumento(resource: T) {
        const mustDelete = confirm("Deseja excluir este item?")
        if (mustDelete) {
            this.resourceService.delete(resource.id!).subscribe(
                () => this.resources = this.resources.filter(element => element != resource),
                () => alert("Erro ao tentar excluir")
            )
        }
    }

}
