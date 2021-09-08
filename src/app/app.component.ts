import { Component } from "@angular/core";
import { NzResizeEvent } from "ng-zorro-antd/resizable";

@Component({
  selector: "nz-demo-table-multiple-sorter",
  template: `
    <nz-table #sortTable [nzData]="listOfData" [nzScroll]="scrollConfig">
      <thead>
        <tr>
          <ng-container
            *ngFor="let column of listOfColumn; trackBy: columnTrackBy"
          >
            <th
              nz-resizable
              nzPreview
              [hidden]="!column.show"
              [nzSortFn]="column.compare"
              [nzSortPriority]="column.priority"
              [nzWidth]="column.width"
              (nzResizeEnd)="onResize($event, column.name)"
              nzCustomFilter
            >
              {{ column.name }}
              <nz-filter-trigger [nzDropdownMenu]="menu">
                <i nz-icon nzType="menu" nzTheme="outline"></i>
              </nz-filter-trigger>

              <nz-resize-handle nzDirection="right">
                <div class="resize-trigger"></div>
              </nz-resize-handle>

              <nz-dropdown-menu #menu="nzDropdownMenu">
                <div
                  class="ant-table-filter-dropdown"
                  style="padding: 8px;width: 190px"
                >
                  <nz-tabset>
                    <nz-tab [nzTitle]="columnTitle">
                      <ul nz-menu>
                        <li nz-submenu [nzTitle]="pinMenu">
                          <ul>
                            <li nz-menu-item>
                              123
                            </li>
                          </ul>
                        </li>
                        <li nz-menu-item>Menu 2</li>
                      </ul>
                    </nz-tab>
                    <nz-tab [nzTitle]="filterTitle"> </nz-tab>
                    <nz-tab [nzTitle]="searchTitle">
                      <div *ngFor="let column of listOfColumn">
                        <label nz-checkbox [(ngModel)]="column.show">{{
                          column.name
                        }}</label>
                      </div>
                    </nz-tab>
                  </nz-tabset>
                </div>

                <ng-template #searchTitle>
                  <i nz-icon nzType="group" nzTheme="outline"></i>
                </ng-template>

                <ng-template #filterTitle>
                  <i nz-icon nzType="filter" nzTheme="outline"></i>
                </ng-template>

                <ng-template #columnTitle>
                  <i nz-icon nzType="menu" nzTheme="outline"></i>
                </ng-template>

                <ng-template #pinMenu>
                  <i nz-icon nzType="pushpin" nzTheme="outline"></i>
                  Pin Column
                </ng-template>
              </nz-dropdown-menu>
            </th>
          </ng-container>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of sortTable.data">
          <ng-container *ngFor="let column of listOfColumn; let i = index">
            <td *ngIf="column.show">
              {{ data.row.cells[i].value }}
            </td>
          </ng-container>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      .resize-trigger {
        width: 1px;
        height: 30px;
        margin-top: 12px;
        background: #e8e8e8;
      }

      .nz-resizable-preview {
        border-width: 0;
        border-right-width: 1px;
      }

      .ant-tabs-tab {
        margin-right: 0;
        padding-left: 15px;
        padding-right: 15px;
      }
    `
  ]
})
export class NzDemoTableMultipleSorterComponent {
  searchValue = "";
  listOfColumn = [
    {
      name: "Name",
      type: "VARCHAR",
      expression: "",
      show: true,
      width: "200px"
    },
    {
      name: "Score",
      type: "BIGINT",
      expression: "",
      show: true,
      width: "200px"
    },
    {
      name: "Address",
      type: "VARCHAR",
      expression: "",
      show: true,
      width: "200px"
    },
    {
      name: "Birthday",
      type: "Date",
      expression: "",
      show: true,
      width: "200px"
    }
  ];

  listOfData = [
    {
      kind: "ROW_KIND_INSERT",
      row: {
        cells: [
          { value: "John Brown" },
          { value: "98" },
          { value: "Xixi Huayuan" },
          { value: "1603800160126" }
        ]
      }
    },
    {
      kind: "ROW_KIND_INSERT",
      row: {
        cells: [
          { value: "Jim Green" },
          { value: "66" },
          { value: "Fuding jiayuan" },
          { value: "160380984123" }
        ]
      }
    },
    {
      kind: "ROW_KIND_INSERT",
      row: {
        cells: [
          { value: "Joe Black" },
          { value: "40" },
          { value: "Qin chengli" },
          { value: "1613800260426" }
        ]
      }
    }
  ];

  scrollConfig = {
    x: "600px"
  };

  columnTrackBy(index: number, item) {
    return item.key;
  }

  onResize({ width }: NzResizeEvent, col: string): void {
    this.listOfColumn = this.listOfColumn.map(e =>
      e.name === col ? { ...e, width: `${width}px` } : e
    );
  }
}
