// 模块懒加载 处理器
import React from 'react';


class BundleComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // mod 这是module 的简称  因为 module  是关键字 因此这里用  mod  代替
      mod: null
    };
  }
  componentWillMount() {
    this.load(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }
  render() {
    return this.props.children(this.state.mod);
  }
}

BundleComponent.propTypes = {
  children: React.PropTypes.func,
  load: React.PropTypes.func
};
BundleComponent.defaultProps = {
  children: null,
  load: null
};

export default BundleComponent;
