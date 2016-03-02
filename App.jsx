// App component - represents the whole app
App = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    console.log(Tasks);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },
 
  renderTasks() {
    // this.getMeteorData().tasks.map
    if (!this.data.tasks.length) {
      return <li>You've finished everything, or need to add a task!</li>;
    } else {
      return this.data.tasks.map((task) => {
        return <Task key={task._id} task={task} />;
      });
    }
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});