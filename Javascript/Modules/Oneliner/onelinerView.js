import { OneLinerApi } from "../../Api/onelinerApi.js";

export class OnelinerView {
    constructor(container) {
        this.container = container;
        this.oneliners = [];
    }

    async render() {
        this.createSearch();
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

    createSearch() {
        this.searchInput = document.createElement("input");
        this.searchInput.placeholder = "Søg efter navn";

        this.searchInput.addEventListener("input", () => {
            const search = this.searchInput.value.toLowerCase();

            const filtered = this.oneliners.filter(o =>
                o.name.toLowerCase().includes(search)
            );

            this.renderList(filtered);
        });

        this.container.appendChild(this.searchInput);
    }

    createForm() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("postit", "postit-large");

        this.form = document.createElement("form");

        this.nameInput = document.createElement("input");
        this.nameInput.placeholder = "Navn";
        this.nameInput.required = true;

        this.descInput = document.createElement("textarea");
        this.descInput.placeholder = "Skriv din joke her…";
        this.descInput.required = true;

        const button = document.createElement("button");
        button.textContent = "Tilføj";

        this.form.append(this.nameInput, this.descInput, button);
        this.form.addEventListener("submit", (e) => this.createOneLiner(e));

        wrapper.appendChild(this.form);
        this.container.appendChild(wrapper);
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
        this.oneliners = await OneLinerApi.getAll();
        this.renderList(this.oneliners);
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

    renderList(oneliners) {
        this.board.innerHTML = "";

        oneliners.forEach(o => {
            const note = document.createElement("div");
            note.classList.add("postit");
            note.style.backgroundColor = this.getRandomColor();

            const name = document.createElement("strong");
            name.textContent = o.name;

            const text = document.createElement("p");
            text.textContent = o.description;

            note.append(name, text);
            this.board.appendChild(note);
        });
    }
}
