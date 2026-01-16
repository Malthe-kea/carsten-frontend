import { OneLinerApi } from "./Api/onelinerApi.js";

export class OnelinerView {

    constructor(container) {
        this.container = container;
    }

    async render() {
        this.createTitle();
        this.createForm();
        this.createList();
        await this.loadOneLiners();
    }

    createTitle() {
        const h1 = document.createElement("h1");
        h1.textContent = "Oneliners";
        this.container.appendChild(h1);
    }

    createForm() {
        this.form = document.createElement("form");

        this.nameInput = document.createElement("input");
        this.nameInput.placeholder = "Navn";
        this.nameInput.required = true;

        this.descInput = document.createElement("textarea");
        this.descInput.placeholder = "Joke";
        this.descInput.required = true;

        const button = document.createElement("button");
        button.textContent = "Tilføj";

        this.form.append(this.nameInput, this.descInput, button);
        this.form.addEventListener("submit", (e) => this.createOneLiner(e));

        this.container.appendChild(this.form);
    }

    createList() {
        this.list = document.createElement("ul");
        this.container.appendChild(this.list);
    }

    async loadOneLiners() {
        const oneliners = await OneLinerApi.getAll();
        this.list.innerHTML = "";

        oneliners.forEach(o => {
            const li = document.createElement("li");
            li.textContent = `${o.name}: ${o.description}`;
            this.list.appendChild(li);
        });
    }

    async createOneLiner(e) {
        e.preventDefault();

        await OneLinerApi.create({
            name: this.nameInput.value,
            description: this.descInput.value
        });

        this.form.reset();
        await this.loadOneLiners();
    }
}
