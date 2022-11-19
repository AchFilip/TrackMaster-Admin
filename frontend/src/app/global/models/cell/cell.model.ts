export class CellModel {

    public self!: number;
    public selected?: boolean
  
    constructor(model?: any) {
      Object.assign(this, model);
    }
  }
  