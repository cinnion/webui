import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { WebSocketService } from '../../../../services';
import { T } from '../../../../translate-marker';
import * as _ from 'lodash';

@Component ({
	selector: 'disk-list',
	template: `<entity-table [title]="title" [conf]="this"></entity-table>`,
})
export class DiskListComponent {
	public title = T("Disks");
	protected queryCall = "disk.query";

	public columns: Array<any> = [
	    { name: T('Name'), prop: 'name', always_display: true },
	    { name: T('Pool'), prop: "pool" },
	    { name: T('Serial'), prop: 'serial' },
	    { name: T('Disk Size'), prop: 'readable_size' },
	    { name: T('Description'), prop: 'description', hidden: true },
	    { name: T('Transfer Mode'), prop: 'transfermode', hidden: true },
	    { name: T('HDD Standby'), prop: 'hddstandby', hidden: true },
	    { name: T('Adv. Power Management'), prop: 'advpowermgmt' },
	    { name: T('Acoustic Level'), prop: 'acousticlevel' },
	    { name: T('Enable S.M.A.R.T.'), prop: 'togglesmart' },
	    { name: T('S.M.A.R.T. extra options'), prop: 'smartoptions', hidden: true },
	    { name: T('Password for SED'), prop: 'passwd', hidden: true },
	];
	public config: any = {
		paging: true,
		sorting: { columns: this.columns },
	};

	protected disk_ready: EventEmitter<boolean> = new EventEmitter();
	protected unusedDisk_ready: EventEmitter<boolean> = new EventEmitter();
	protected unused: any;
	protected disk_pool: Map<string, string> = new Map<string, string>();
	constructor(protected ws: WebSocketService, protected router: Router) {
		this.ws.call('boot.get_disks', []).subscribe((boot_res)=>{
			for (let boot in boot_res) {
				this.disk_pool.set(boot_res[boot], T('Boot Pool'));
			}
			this.ws.call('disk.get_unused', []).subscribe((unused_res)=>{
				this.unused = unused_res;
				this.unusedDisk_ready.emit(true);
				for (let unused in unused_res) {
					this.disk_pool.set(unused_res[unused].name, T('Unused'));
				}
				this.ws.call('pool.query', []).subscribe((pool_res)=>{
					for (let pool in pool_res) {
						this.ws.call('pool.get_disks', [pool_res[pool].id]).subscribe((res) => {
							for (let k in res) {
								this.disk_pool.set(res[k], pool_res[pool].name);
							}
							this.disk_ready.emit(true);
						});
					}
				});
			});
		});
	}

	getActions(parentRow) {
   	const actions = [{
      label: T("Edit"),
      onClick: (row) => {
        this.router.navigate(new Array('/').concat([
          "storage", "disks", "edit", row.identifier
        ]));
      }
    }];
    this.unusedDisk_ready.subscribe((res)=>{
			if (_.find(this.unused, {"name": parentRow.name})) {
	    	actions.push({
	    		label: T("Wipe"),
	        onClick: (row) => {
	          this.router.navigate(new Array('/').concat([
	            "storage", "disks", "wipe", row.name
	          ]));
	        }
	    	})
	    }
		});
    return actions;
  }

	dataHandler(entityList: any) {
		this.disk_ready.subscribe((res)=>{
			for (let i = 0; i < entityList.rows.length; i++) {
	      entityList.rows[i].readable_size = (<any>window).filesize(entityList.rows[i].size, { standard: "iec" });
	      entityList.rows[i].pool = this.disk_pool.get(entityList.rows[i].name);
	    }
		})


  }
}