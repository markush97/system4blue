import { Injectable } from '@angular/core';
import { StorageContainer, StorageType } from '@system4blue/api-interfaces';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { UUID4 } from '@system4blue/types';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs/operators';
import { AdminStorageFormComponent } from './admin-storage-form/admin-storage-form.component';

@Injectable({
  providedIn: 'root',
})
export class AdminStorageService {
  private readonly PATH = '/api/storage';

  private ref!: DynamicDialogRef;

  constructor(
    private readonly http: HttpClient,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}

  async getContainers(): Promise<StorageContainer[]> {
    return this.http.get<StorageContainer[]>(this.PATH).toPromise();
  }

  async getContainersTree(): Promise<TreeNode<StorageContainer>[]> {
    return (await this.getContainers()).map<TreeNode<StorageContainer>>(
      this.createTreeNodeFromContainer
    );
  }

  editContainer(container: StorageContainer) {
    this.ref = this.dialogService.open(AdminStorageFormComponent, {
      header: 'Lager Information',
      closeOnEscape: true,
      dismissableMask: true,
      data: {
        container: container,
      },
    });
  }

  showEntity(container: StorageContainer) {
    this.editContainer(container);
  }

  addRootContainer(): void {
    this.ref = this.dialogService.open(AdminStorageFormComponent, {
      header: 'Neues Lager anlegen',
      dismissableMask: true,
      closeOnEscape: true,
    });
  }

  addContainer(parentId: string): void {
    this.ref = this.dialogService.open(AdminStorageFormComponent, {
      header: 'Neues Unterlager anlegen',
      dismissableMask: true,
      closeOnEscape: true,
      data: {
        parentId: parentId,
      },
    });
  }

  deleteContainer(container: StorageContainer) {
    this.confirmationService.confirm({
      message: container.name + ' wirklich löschen?',
      header: 'Bestätigen',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`${this.PATH}/${container.id}`).subscribe(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg',
            detail: container.name + ' gelöscht',
            life: 3000,
          })
        );
      },
    });
  }

  async updateContainer(container: StorageContainer, containerId: UUID4) {
    this.http
      .put<StorageContainer>(`${this.PATH}/${containerId}`, container)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${container.name} wurde aktualisiert`,
            life: 3000,
          });
          this.ref.close();
        })
      )
      .subscribe();
  }

  async createRootContainer(
    container: StorageContainer
  ): Promise<StorageContainer> {
    return this.http
      .post<StorageContainer>(this.PATH, container)
      .pipe<StorageContainer>(
        tap((container: StorageContainer) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `${container.name} wurde angelegt`,
            life: 3000,
          });
          this.ref.close();
        })
      )
      .toPromise();
  }

  async createSubContainer(
    subContainer: StorageContainer,
    containerId: UUID4
  ): Promise<StorageContainer> {
    return this.http
      .post<StorageContainer>(`${this.PATH}/${containerId}`, subContainer)
      .pipe<StorageContainer>(
        tap((container: StorageContainer) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Erfolg!',
            detail: `Untercontainer ${container.name} wurde angelegt`,
            life: 3000,
          });
          this.ref.close();
        })
      )
      .toPromise();
  }

  private createTreeNodeFromContainer = (
    container: StorageContainer
  ): TreeNode<StorageContainer> => {
    return {
      children: container.subContainers?.map(this.createTreeNodeFromContainer),
      data: container,
      key: container.id,
      label: container.name,
      collapsedIcon: this.getContainerIcon(container.type),
      expandedIcon: this.getContainerIcon(container.type),
    };
  };

  getContainerIcon = (storageType?: StorageType): string => {
    switch (storageType) {
      case StorageType.BOX:
        return 'pi pi-inbox';

      case StorageType.HOUSE:
        return 'pi pi-home';

      case StorageType.PERSON:
        return 'pi pi-user';

      default:
        return 'pi pi-inbox';
    }
  };
}
