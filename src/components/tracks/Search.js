import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";
class Search extends Component {
  state = {
    trackTitle: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();
    // API call
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=des&apikey=${process.env.REACT_APP_MUSIC_KEY}`
      )
      .then(res => {
        dispatch({
          type: "SEARCH_TRACK",
          payload: res.data.message.body.track_list,
          trackTitle: this.state.trackTitle
        });
        this.setState({ trackTitle: "" });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer value={this.state}>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    name="trackTitle"
                    className="form-control form-control-lg"
                    placeholder="Search your favorite song lyrics"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-secondary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
