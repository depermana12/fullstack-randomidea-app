import ideasApi from "../services/ideasApi";
import IdeaApi from "../services/ideasApi";

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    // empty, then will get the get idea method that will fetch them through our api service
    // then fill the array ideas with the backend idea that in our database
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("education");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  addEventListener() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        // whenever we have data-id, we can get the id using dataset.
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeaApi.getIdea();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }
  async deleteIdea(ideaid) {
    try {
      // delete from server. gonna do that through api class method
      const res = await ideasApi.deleteIdea(ideaid);
      // delete from the DOM
      // this filter will get all but the ones that has been deleted
      this._ideas.filter((idea) => idea._id !== ideaid);
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource: ", error);
    }
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";

    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        return `
        <div class="card" data-id="${idea._id}">
          ${deleteBtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join("");
    this.addEventListener();
  }
}

export default IdeaList;
