interface validateObject {
    value: string;
    required?: boolean;
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}

function validate(inputValidation: validateObject){
    let isValid = true;
    if (inputValidation.required) { 
        isValid = isValid && inputValidation.value.length !== 0
    }
    if (inputValidation.maxLength !== undefined && inputValidation.maxLength !== null && typeof inputValidation.value === "string"){
        isValid = isValid && inputValidation.value.length <= inputValidation.maxLength
    }
    if (inputValidation.minLength !== undefined && inputValidation.minLength !== null && typeof inputValidation.value === "string"){
        isValid = isValid && inputValidation.value.length >= inputValidation.minLength
    }
    if (inputValidation.max !== undefined && inputValidation.max !== null && typeof inputValidation.value === "number"){
        isValid = isValid && inputValidation.value <= inputValidation.max
    }
    if (inputValidation.min !== undefined && inputValidation.min !== null && typeof inputValidation.value === "number"){
        isValid = isValid && inputValidation.value >= inputValidation.min
    }
    return isValid;
}

//Autobind decorator
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

//Class
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
      const titleValidation: validateObject = {
        value: titleInput,
        required: true
    }
    const descValidation: validateObject = {
        value: descInput,
        required: true, 
        minLength: 10,
        maxLength: 255
        
    }
    const peopleValidation: validateObject = {
        value: peopleInput,
        required: true,
        min: 1
    }
      if (validate(titleValidation) && validate(descValidation) && validate(peopleValidation)) {
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
