import React from "react";

export default class AddMovie extends React.Component {
  state = {
    title: "",
    director: "",
    metascore: "",
    stars: [""]
  };

  addStar = async e => {
    e.preventDefault();

    const newStars = Array.from(this.state.stars);
    newStars.push("");

    console.log(newStars);

    await this.setState({
      stars: newStars
    });
    console.log(this.state);
  };

  updateStar = async (value, index) => {
    const newStars = Array.from(this.state.stars);

    newStars[index] = value;

    await this.setState({
      stars: newStars
    });
  };

  deleteStar = async index => {
    const newStars = Array.from(this.state.stars);

    newStars.splice(index, 1);

    await this.setState({
      stars: newStars
    });
  };

  addMovie = e => {
    e.preventDefault();

    this.props.addMovie(this.state);

    this.props.history.push('/');
  };

  render() {
    return (
      <form onSubmit={this.addMovie} className="add-movie-form">
        <div className="form-field">
          <label>Movie title</label>
          <input
            onChange={e => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </div>
        <div className="form-field">
          <label>Director</label>
          <input
            onChange={e => this.setState({ director: e.target.value })}
            value={this.state.director}
          />
        </div>
        <div className="form-field">
          <label>Metascore</label>
          <input
            onChange={e => this.setState({ metascore: e.target.value })}
            value={this.state.metascore}
          />
        </div>
        <div className="form-field">
          <label>Stars</label>
          {this.state.stars.map((star, index) => {
            return (
              <div key={(index + 1) * 2000} className="stars-field">
                <input
                  key={index}
                  onChange={e => this.updateStar(e.target.value, index)}
                  value={star}
                />
                <button
                  onClick={() => this.deleteStar(index)}
                  key={(index + 1) * 1000}
                >
                  x
                </button>
              </div>
            );
          })}
          <button onClick={this.addStar}>Add new star...</button>
        </div>

        <button onClick={this.addMovie}>Add Movie</button>
      </form>
    );
  }
}
