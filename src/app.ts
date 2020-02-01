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
  private inputsPayload (): [string, string, number]{
      const titleInput = this.titleInputElement.value
      const descInput = this.descriptionInputElement.value
      const peopleInput = this.peopleInputElement.value
      if (titleInput.length === 0 || descInput.length === 0 || peopleInput.length === 0) {
         throw new Error("Title or desc or people input is wrong")
      } 
      return [titleInput, descInput, +peopleInput]
  }
  clearInputs(){
    this.titleInputElement.value = ""
    this.descriptionInputElement.value = ""
    this.peopleInputElement.value = ""
  }
  @Autobind
  private handleSubmit(e: Event) {
    e.preventDefault();
   const userInput = this.inputsPayload()
   if (Array.isArray(userInput)){
       const [title, desc, people] = userInput;
       console.log(title, desc, people)
   }
   this.clearInputs();
  }
  private InputText() {
    this.element.addEventListener("submit", this.handleSubmit);
  }
}

const prjInputRender = new ProjectInput();
