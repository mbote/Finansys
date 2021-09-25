import { OnInit, Directive } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.services';

import * as toastr from 'toastr';
@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(private resourceService: BaseResourceService<T>) { }

    ngOnInit(): void {
        this.resourceService.getAll().subscribe(
            resources => this.resources = resources,
            error => toastr.error("Erro ao carregar a lista")
        )
    }

    deletarResource(resource: T) {
        const mustDelete = confirm("Deseja excluir este item?")
        if (mustDelete) {
            this.resourceService.delete(resource.id!).subscribe(
                () => this.resources = this.resources.filter(element => element != resource),
                () => toastr.error("Erro ao tentar excluir")
            )
        }
    }

}
