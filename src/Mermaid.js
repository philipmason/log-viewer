import React from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "forest",
  securityLevel: "loose",
  logLevel: 4,
  maxTextSize: 1000000,
  maxEdges: 10000,
  flowchart: {
    useMaxWidth: false,
  },
  themeCSS: `
    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    }
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 0.5;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    }
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
  fontFamily: "Fira Code",
});

export default class Mermaid extends React.Component {
  componentDidMount() {
    mermaid.contentLoaded();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.chart !== this.props.chart) {
      // Remove mermaid's processed attribute so it re-renders
      const el = this.mermaidRef;
      if (el) {
        el.removeAttribute("data-processed");
        el.innerHTML = this.props.chart;
        mermaid.contentLoaded();
      }
    }
  }
  render() {
    // console.log("this.props", this.props);
    return (
      <div
        className="mermaid"
        ref={(el) => (this.mermaidRef = el)}
      >
        {this.props.chart}
      </div>
    );
  }
}
