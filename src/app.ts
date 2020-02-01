function Autobind (_1: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
   const adjustedMethod: PropertyDescriptor = {
       configurable: true,
       enumerable: false,
       get() {
           const boundingFunc = originalMethod.bind(this)
           return boundingFunc;
       }
   }
   return adjustedMethod;
}


class ProjectInput {
  templteElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;
  // button: HTMLButtonElement

  constructor() {
    this.templteElement = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;

    const importHTMLContent = document.importNode(
      this.templteElement.content,
      true
    );
    this.element = importHTMLContent.firstElementChild as HTMLFormElement;
    this.element.className = "user-input";
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLTextAreaElement;

    this.InputText();

    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
  @Autobind
  private handleSubmit(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value);
  }
  private InputText() {
    this.element.addEventListener("submit", this.handleSubmit);
  }
}

const prjInputRender = new ProjectInput();
