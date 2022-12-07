export class CellModel {

    public id!: number;
    public wallID!: number;
    public selected?: boolean
  
    constructor(model?: any) {
      Object.assign(this, model);
    }
  }
  