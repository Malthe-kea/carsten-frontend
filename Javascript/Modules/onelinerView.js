import { OneLinerApi } from "../Api/onelinerApi.js";

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
        this.board = document.createElement("div");
        this.board.classList.add("postit-board");
        this.container.appendChild(this.board);
    }

    getRandomColor() {
        const colors = [
            "#fff9a6", // gul
            "#ffd6e0", // pink
            "#d6f5d6", // grøn
            "#d6e4ff", // blå
            "#fce1c9"  // orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }



    async loadOneLiners() {
        const oneliners = await OneLinerApi.getAll();
        this.board.innerHTML = "";

        oneliners.forEach(o => {
            const note = document.createElement("div");
            note.classList.add("postit");
            note.style.backgroundColor = this.getRandomColor();

            const title = document.createElement("h3");
            title.textContent = o.name;

            const text = document.createElement("p");
            text.textContent = o.description;

            note.append(title, text);
            this.board.appendChild(note);
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
