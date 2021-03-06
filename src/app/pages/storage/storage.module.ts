import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { MaterialModule } from '../../appMaterial.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';

import { EntityModule } from '../common/entity/entity.module';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';

import { SnapshotAddComponent } from './snapshots/snapshot-add/';
import { SnapshotCloneComponent } from './snapshots/snapshot-clone/';
import { SnapshotListComponent } from './snapshots/snapshot-list/';
import { SnapshotRollbackComponent } from './snapshots/snapshot-rollback/';
import { DatasetFormComponent } from './volumes/datasets/dataset-form/';
import { DatasetPermissionsComponent } from './volumes/datasets/dataset-permissions/'
import {ImportDiskComponent} from './import-disk/import-disk.component';

import { DiskComponent, ManagerComponent, VdevComponent } from './volumes/manager/';
// import { VolumesEditComponent } from './volumes/volumes-edit/';
import { VolumeDeleteComponent } from './volumes/volume-delete/';
import { VolumesListComponent } from './volumes/volumes-list/';
import { VolumeStatusComponent } from './volumes/volume-status';
import { routing } from './storage.routing';
import { ZvolFormComponent } from './volumes/zvol/zvol-form'
import { VMwareSnapshotFormComponent } from './VMware-snapshot/VMware-snapshot';
import { VMwareSnapshotListComponent } from './VMware-snapshot/VMware-snapshot-list';
import { DiskListComponent } from './disks/disk-list/';
import { DiskFormComponent } from './disks/disk-form/';
import { DiskWipeComponent } from './disks/disk-wipe/disk-wipe.component';
import { BrowserModule } from '@angular/platform-browser';
import { DxTreeListModule } from 'devextreme-angular';
import { VolumeRekeyFormComponent } from 'app/pages/storage/volumes/volumerekey-form';
import { VolumeAddkeyFormComponent } from 'app/pages/storage/volumes/volumeaddkey-form';
import { VolumeCreatekeyFormComponent } from 'app/pages/storage/volumes/volumecreatekey-form/volumecreatekey-form.component';
import { VolumeChangekeyFormComponent } from 'app/pages/storage/volumes/volumechangekey-form/volumechangekey-form.component';
import { VolumeImportWizardComponent} from './volumes/volume-import-wizard';
import { MessageService } from '../common/entity/entity-form/services/message.service';

@NgModule({
  imports : [
    RouterModule, DragulaModule, EntityModule, CommonModule, FormsModule,
    ReactiveFormsModule, routing, MaterialModule,
    NgxDatatableModule, DxTreeListModule, TranslateModule
  ],
  declarations : [
    VolumesListComponent,
    ManagerComponent,
    DiskComponent,
    VdevComponent,
    DatasetFormComponent,
    // VolumesEditComponent,
    VolumeDeleteComponent,
    VolumeRekeyFormComponent,
    VolumeAddkeyFormComponent,
    VolumeCreatekeyFormComponent,
    VolumeChangekeyFormComponent,
    ZvolFormComponent,
    VolumeImportWizardComponent,
    SnapshotListComponent,
    SnapshotCloneComponent,
    SnapshotRollbackComponent,
    SnapshotAddComponent,
    ImportDiskComponent,
    DatasetPermissionsComponent,
    VMwareSnapshotFormComponent,
    VMwareSnapshotListComponent,
    DiskListComponent,
    VolumeStatusComponent,
    DiskFormComponent,
    DiskWipeComponent
  ],
  providers : [UserService, StorageService, MessageService]
})
export class StorageModule {
}
