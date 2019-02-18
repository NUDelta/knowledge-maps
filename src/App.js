import React from "react";
import "./App.css";
import { exampleA, exampleB } from "./Components/data";
import Highlighter from "react-highlight-words";
import Button from "@material-ui/core/Button";

// Parse the CSS code into arrays
var exampleAarr = exampleA.split("\n");
var exampleBarr = exampleB.split("\n");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: [exampleAarr, exampleBarr], highlight: [] };
    this.highlightCode = this.highlightCode.bind(this);
  }

  highlightCode(tier) {
    var examples = this.state.isSelected;
    if (tier === true) {
      var tier1 = examples.reduce((a, b) =>
        a.filter(c => b.includes(c.trim()))
      );
      this.setState(state => {
        return { highlight: tier1 };
      });
    } else {
      var i;
      var all_attributes = [];
      for (i = 0; i < examples.length; i++) {
        var j;
        var curr_code = [];
        for (j = 0; j < examples[i].length; j++) {
          var temp = examples[i][j].split(":");
          if (temp.length > 0) {
            // Store only the attributes
            curr_code.push(temp[0]);
          }
          all_attributes.push(curr_code);
        }
        var tier2 = all_attributes.reduce((a, b) =>
          a.filter(c => b.includes(c.trim()))
        );
        console.log(tier2);
      }
      this.setState(state => {
        return { highlight: tier2 };
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div id="exampleA">
          <Highlighter
            className="HighlightText"
            searchWords={this.state.highlight}
            textToHighlight={exampleA}
          />
        </div>
        <br />
        <br />
        <div id="exampleB">
          <Highlighter
            className="HighlightText"
            searchWords={this.state.highlight}
            textToHighlight={exampleB}
          />
        </div>
        <br />
        <div className="Buttons">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.highlightCode(true)}
          >
            Tier 1 Highlighting
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.highlightCode(false)}
          >
            Tier 2 Highlighting
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
