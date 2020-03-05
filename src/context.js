import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [
      { track: { track_name: "track1" } },
      { track: { track_name: "track2" } },
      { track: { track_name: "track3" } }
    ],
    heading: "Top 10 tracks"
  };

  // Component lifecycle
  componentDidMount() {}

  render() {
    return <Context.Provider>{this.props.children}</Context.Provider>;
  }
}

export const Consumer = Context.Consumer;
