type HTMLSelectOptionMappingFn = (item: unknown) => HTMLOptionElement;

export default class Dom {
  private static instance: Dom;
  private elementMap = new Map();

  /**
   * The Dom's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * The static method that controls the access to the Dom instance.
   *
   * This implementation let you subclass the Dom class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Dom {
    if (!Dom.instance) {
      Dom.instance = new Dom();
    }

    return Dom.instance;
  }

  public getElementById<Res>(id: string) {
    const elMap = this.elementMap.get(id);
    if (!elMap) {
      const el = document.getElementById(id);
      this.elementMap.set(id, el);
    }
    return this.elementMap.get(id) as Res;
  }

  public getElementByName<Res>(name: string): Res[] {
    const elMap = this.elementMap.get(name);
    if (!elMap) {
      const el = document.getElementsByName(name);
      this.elementMap.set(name, el);
    }
    return this.elementMap.get(name) as Res[];
  }

  public addEventListenerById<El extends HTMLElement, K extends keyof HTMLElementEventMap>(
    id: string,
    type: K,
    listener: (ev: HTMLElementEventMap[K], el?: El) => any
  ) {
    const element = this.getElementById<El>(id);
    element.removeEventListener(type, listener);
    element.addEventListener(type, (e) => listener(e, element));
  }

  public addEventListenerByClassName<El extends HTMLElement, K extends keyof HTMLElementEventMap>(
    clsName: string,
    type: K,
    listener: (ev: HTMLElementEventMap[K], els: El) => any
  ) {
    const els = document.querySelectorAll<El>(clsName);
    els.forEach((el) => {
      el.removeEventListener(type, (e) => listener(e, el));
      el.addEventListener(type, (e) => listener(e, el));
    });
  }

  public getContext(id: string): CanvasRenderingContext2D {
    const ctxId = `ctx${id}`;
    const elMap = this.elementMap.get(ctxId);
    if (!elMap) {
      const el = document.getElementById(id) as HTMLCanvasElement;
      this.elementMap.set(ctxId, el.getContext('2d'));
    }
    return this.elementMap.get(ctxId) as CanvasRenderingContext2D;
  }

  public renderSelectOption(elId: string, data: any[], mappingFn: HTMLSelectOptionMappingFn) {
    if (!data || data.length === 0) {
      return;
    }
    const el = this.getElementById<HTMLSelectElement>(elId);

    data.forEach((item) => {
      const mappedData = mappingFn(item);
      const option = document.createElement('option');
      option.value = mappedData.value;
      option.text = mappedData.text;
      el.add(option);
    });
  }

  public getInputValueById(id: string): string {
    return this.getElementById<HTMLInputElement>(id).value;
  }

  public getInputValueByName(name: string): string[] {
    const els = document.getElementsByName(name);
    const data = [];
    for (let index = 0; index < els.length; index++) {
      const element: any = els.item(index);
      data.push(element?.value as never);
    }
    return data;
  }

  public setInputValueById(id: string, value: string) {
    this.getElementById<HTMLInputElement>(id).value = value;
  }
}
