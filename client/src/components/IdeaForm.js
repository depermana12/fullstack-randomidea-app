class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
  }

  addEventListener() {
    // we need to bind this keyword becaut this is on event listener and a callback,
    //otherwise if we don't do this. its gonna pretain to the form itself not the class
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    const idea = {
      // .text is the name of the input in the html
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };
    console.log(idea);
    // clear fields
    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    document.dispatchEvent(new Event("closemodal"));
  }

  render() {
    this._formModal.innerHTML = `
        <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>`;
    this._form = document.querySelector("#idea-form");
    this.addEventListener();
  }
}

export default IdeaForm;
