import React, { Fragment, useState } from "react";
import Select from "react-select";;

let teams = ["ENCE", "G2 Esports", "forZe", "Astralis", "Team Vitality", "MIBR", "Imperial Esports", "Bad News Eagles", "Eternal Fire", "Team Spirit", "Outsiders", "Complexity Gaming", "IHC Esports", "Renegades", "Team Liquid", "9z Team"];

let options = [];

options = options.concat(teams.map(x => x));

function MakeOption(x) {
  return { value: x, label: x };
}

const InputTeam = () => {
  
}

class TeamSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (value, e) => {
    if (e.action === "input-change") {
      this.setState({ value });
    }
  };

  handleSubmit (e) {
    alert('Data submitted: ' + this.state.value);
    e.preventDefault();
 }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Select
          isMulti
          name="teams"
          options={options.map(x => MakeOption(x))}
          className="multi-select"
          classNamePrefix="select"
          closeMenuOnSelect={false}
          onInputChange={this.handleInputChange}
          inputValue={this.state.value}
        />
        <input type="submit" value="Submit" />
      </form>

    );
  }
}
export default TeamSelector;