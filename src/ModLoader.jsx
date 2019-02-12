import React from 'react';
import { ActivityIndicator } from 'antd-mobile';
import Bundle from './Bundle';

class ModLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null
    };
  }
  render() {
    return (
      <div>
        <Bundle load={this.props.mod}>
          {
            (Page) => {
              if (Page) {
                return (
                  <Page match={this.props.match} history={this.props.history} />
                );
              }
              return (
                <div>
                  <ActivityIndicator
                    toast
                    text="正在加载"
                    animating
                  />
                </div>
              );
            }
          }
        </Bundle>
      </div>
    );
  }

}

ModLoader.defaultProps = {
  mod: {},
  history: {},
  match: {}
};

ModLoader.propTypes = {
  mod: React.PropTypes.func,
  history: React.PropTypes.object,
  match: React.PropTypes.object
};

export default ModLoader;
